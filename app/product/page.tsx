"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Info,
  Package,
} from "lucide-react";

interface ProductData {
  code: string;
  product_name: string;
  brands?: string;
  quantity?: string;
  categories?: string;
  selected_images?: {
    [key: string]: string;
  };
  primary_score?: {
    score: number | null;
    grade: string | null;
    grade_color: string;
    assessment: string;
    type: string | null;
  };
  nutriments?: {
    positive_nutrient: Array<{
      name: string;
      quantity: string;
      text: string;
      color: string;
      icon: string;
    }>;
    negative_nutrient: Array<{
      name: string;
      quantity: string;
      text: string;
      color: string;
      icon: string;
    }>;
  };
  health_risk?: {
    ingredient_warnings: Array<{
      issue: string;
      reasoning: string;
    }>;
  };
  ingredients?: Array<{
    name: string;
    icon: string;
    percentage: string;
  }>;
  additives_names?: string[];
  nova_group?: number;
  nova_group_name?: string;
  total_health_risks?: number;
  recommended_product?: {
    product_name: string;
    brands?: string;
    selected_images?: {
      [key: string]: string;
    };
    code?: string;
    nova_group?: number;
    primary_score?: {
      score: number;
      grade: string;
      grade_color: string;
      assessment: string;
      type: string;
    };
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ProductPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllWarnings, setShowAllWarnings] = useState(false);

  const productCode = searchParams.get("code");
  const productName = searchParams.get("name");

  useEffect(() => {
    const fetchProduct = async () => {
      if (authLoading) {
        return;
      }

      if (!user?.email) {
        setError("Please sign in to view product details");
        setLoading(false);
        return;
      }

      if (!productCode && !productName) {
        setError("Missing required information");
        setLoading(false);
        return;
      }

      // Clear old product data and show loading immediately
      setProduct(null);
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          search_query: productName || productCode || "",
          page: "1",
          page_size: "1",
        });

        const idToken = await user.getIdToken();

        const response = await fetch(`${API_URL}/search/text?${queryParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Mivro-Email": user.email,
            Authorization: `Bearer ${idToken}`,
          },
        });

        const data = await response.json();
        // console.log('Backend API Response:', data);

        if (data.error || !data.products || data.products.length === 0) {
          setError("Product not found");
          return;
        }

        setProduct(data.products[0]);
      } catch (err) {
        console.error("Backend API Error:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [user, productCode, productName, authLoading]);

  const getProductImageUrl = (selectedImages?: {
    [key: string]: string;
  }): string => {
    if (!selectedImages) return "";
    const languages = Object.keys(selectedImages);
    if (languages.length > 0) {
      return selectedImages[languages[0]] || "";
    }
    return "";
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-800/20 border-t-primary-800"></div>
          <div className="text-center space-y-2 max-w-md">
            <p className="text-lg font-semibold text-foreground">
              Analyzing Product...
            </p>
            <p className="text-sm text-muted-foreground">
              We're fetching the latest data about this product. This may take a
              few moments.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {error || "Product not found"}
            </p>
            <Button
              onClick={() => router.back()}
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button onClick={() => router.back()} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-full md:w-64 h-64 flex items-center justify-center">
              {getProductImageUrl(product.selected_images) ? (
                <img
                  src={getProductImageUrl(product.selected_images)}
                  alt={product.product_name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package className="w-20 h-20 text-gray-400" />
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {product.product_name}
                </h1>
                {product.brands && (
                  <p className="text-lg text-muted-foreground">
                    {product.brands}
                  </p>
                )}
              </div>
              {product.primary_score &&
                product.primary_score.score !== null && (
                  <div className="flex items-center gap-6">
                    <div>
                      <div
                        className="text-5xl font-bold"
                        style={{ color: product.primary_score.grade_color }}
                      >
                        {product.primary_score.score}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Health Score
                      </p>
                    </div>
                    {product.primary_score.grade && (
                      <div className="flex flex-col gap-2">
                        <div
                          className="text-2xl font-bold px-4 py-2 rounded-lg"
                          style={{
                            color: product.primary_score.grade_color,
                            backgroundColor: `${product.primary_score.grade_color}20`,
                          }}
                        >
                          {product.primary_score.grade}
                        </div>
                        <p className="text-sm font-medium">
                          {product.primary_score.assessment}
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
              Health Warnings
            </h2>
          </div>
          {product.health_risk?.ingredient_warnings &&
          product.health_risk.ingredient_warnings.length > 0 ? (
            <>
              <div className="space-y-3">
                {product.health_risk.ingredient_warnings
                  .slice(0, showAllWarnings ? undefined : 3)
                  .map((warning, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900"
                    >
                      <p className="font-semibold text-red-900 dark:text-red-100 mb-1">
                        {warning.issue}
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {warning.reasoning}
                      </p>
                    </div>
                  ))}
              </div>
              {product.health_risk.ingredient_warnings.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllWarnings(!showAllWarnings)}
                  className="mt-4 w-full text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-950/50"
                >
                  {showAllWarnings
                    ? "Show Less"
                    : `Show ${product.health_risk.ingredient_warnings.length - 3} More`}
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm text-red-700 dark:text-red-300">
              No specific health warnings identified for this product.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-semibold">Nutrients to Limit</h2>
          </div>
          {product.nutriments?.negative_nutrient &&
          product.nutriments.negative_nutrient.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.nutriments.negative_nutrient.map((nutrient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50"
                  style={{ backgroundColor: `${nutrient.color}10` }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: nutrient.color }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{nutrient.name}</p>
                      {nutrient.text && (
                        <p className="text-xs text-muted-foreground">
                          {nutrient.text}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-sm ml-2">
                    {nutrient.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No concerning nutrients detected in this product.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Beneficial Nutrients</h2>
          </div>
          {product.nutriments?.positive_nutrient &&
          product.nutriments.positive_nutrient.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.nutriments.positive_nutrient.map((nutrient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50"
                  style={{ backgroundColor: `${nutrient.color}10` }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: nutrient.color }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{nutrient.name}</p>
                      {nutrient.text && (
                        <p className="text-xs text-muted-foreground">
                          {nutrient.text}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-sm ml-2">
                    {nutrient.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No beneficial nutrients data available.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-6 w-6 text-primary-800" />
            <h2 className="text-xl font-semibold">Ingredients</h2>
          </div>
          {product.ingredients && product.ingredients.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {ingredient.name}
                  {ingredient.percentage && (
                    <span className="ml-1 text-xs opacity-70">
                      ({ingredient.percentage})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ingredient information not available for this product.
            </p>
          )}
        </Card>

        {product.nova_group && product.nova_group_name && (
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-800/10 text-primary-800">
                <span className="text-2xl font-bold">{product.nova_group}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Processing Level</h3>
                <p className="text-muted-foreground">
                  {product.nova_group_name}
                </p>
              </div>
            </div>
          </Card>
        )}

        {product.recommended_product &&
          product.recommended_product.product_name &&
          product.recommended_product.product_name !==
            "No recommendation available" && (
            <Card
              className={cn(
                "p-6 bg-primary-50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-900 transition-shadow",
                product.recommended_product.code
                  ? "cursor-pointer hover:shadow-lg"
                  : "cursor-not-allowed opacity-75",
              )}
              onClick={(e) => {
                e.preventDefault();
                if (product.recommended_product?.code) {
                  const newUrl = `/product?code=${product.recommended_product.code}&name=${encodeURIComponent(product.recommended_product.product_name || "")}`;
                  router.push(newUrl);
                }
              }}
            >
              <h2 className="text-xl font-semibold mb-4 text-primary-800 dark:text-primary-300">
                Recommended Alternative
                {!product.recommended_product.code && (
                  <span className="text-xs ml-2 text-muted-foreground font-normal">
                    (Details not available)
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  {product.recommended_product.selected_images &&
                  getProductImageUrl(
                    product.recommended_product.selected_images,
                  ) ? (
                    <img
                      src={getProductImageUrl(
                        product.recommended_product.selected_images,
                      )}
                      alt={product.recommended_product.product_name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Package className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">
                    {product.recommended_product.product_name}
                  </p>
                  {product.recommended_product.brands && (
                    <p className="text-sm text-muted-foreground">
                      {product.recommended_product.brands}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
