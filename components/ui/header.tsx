"use client";

import { signOut as serverSignOut } from "@/app/(auth)/actions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import AnalysisLogo from "@/public/images/analysis.png";
import { auth } from "@/utils/firebase/client";
import { signOut as firebaseSignOut } from "firebase/auth";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import AuthButton from "./authbutton";
import DarkModeToggle from "./darkmode-toggle";
import MobileMenu from "./mobile-menu";
import UserProfile from "./user-profile";

const DropdownNavItem = ({
  trigger,
  children,
}: {
  trigger: string;
  children: ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const ListItem = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-200 hover:text-mivro-green focus:bg-gray-200 focus:text-mivro-green",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

const OPENFOODFACTS_API = {
  BASE_URL: "https://world.openfoodfacts.org",
  USER_AGENT: "Mivro/1.0",
};

interface Product {
  code: string;
  product_name: string;
  brands?: string;
  image_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  selected_images?: any;
}

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      await serverSignOut();
    } catch (error) {}
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    setProducts([]);

    try {
      const url = new URL(`${OPENFOODFACTS_API.BASE_URL}/cgi/search.pl`);
      url.searchParams.append("search_terms", query);
      url.searchParams.append("page", "1");
      url.searchParams.append("page_size", "12");
      url.searchParams.append("json", "true");
      url.searchParams.append(
        "fields",
        "code,product_name,brands,image_url,image_front_url,image_front_small_url,selected_images",
      );

      const response = await fetch(url.toString(), {
        headers: {
          "User-Agent": OPENFOODFACTS_API.USER_AGENT,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      // console.log('OpenFoodFacts API Response:', data);

      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        setShowResults(true);
      } else {
        setProducts([]);
        setShowResults(true);
      }
    } catch (err) {
      console.error("OpenFoodFacts API Error:", err);
      setProducts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    setShowResults(false);
  };

  const getProductImageUrl = (product: Product): string => {
    if (product.selected_images?.front?.display?.en) {
      return product.selected_images.front.display.en;
    }
    if (product.selected_images?.front?.display) {
      const languages = Object.keys(product.selected_images.front.display);
      if (languages.length > 0) {
        return product.selected_images.front.display[languages[0]];
      }
    }
    return (
      product.image_front_small_url ||
      product.image_front_url ||
      product.image_url ||
      ""
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 p-3 transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-6xl">
        <nav
          className="rounded-full border border-border/50 bg-background shadow-md transition-all duration-300 ease-in-out"
          aria-label="Main navigation"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex flex-shrink-0 items-center"
                  aria-label="MIVRO Home"
                >
                  <div className="text-2xl font-bold">Mivro</div>
                </Link>
                <nav className="ml-6 hidden md:block" aria-label="Main menu">
                  <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                      <NavigationMenuItem>
                        <Link
                          href="/marketplace"
                          className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-accent-foreground focus:bg-gray-200 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-200 data-[state=open]:bg-gray-200"
                        >
                          Marketplace
                        </Link>
                      </NavigationMenuItem>
                      <DropdownNavItem trigger="Resources">
                        <ul className="grid w-[400px] gap-3 bg-background p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <ListItem href="/about" title="About">
                            Learn more about Mivro
                          </ListItem>
                          <ListItem href="/team" title="Team">
                            Know about the people behind Mivro
                          </ListItem>
                          <ListItem
                            href="https://docs.google.com/presentation/d/1mxhh5Z6-F71714eD62kbfIa_T-FQAd3bwUTcZmL84Do/edit?usp=sharing"
                            title="Documentation"
                          >
                            Read insights on Mivro&apos;s development
                          </ListItem>

                          <ListItem href="/changelog" title="Changelog">
                            See what&apos;s new in Mivro
                          </ListItem>
                        </ul>
                      </DropdownNavItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </nav>
              </div>
              <div
                className="absolute left-1/2 -translate-x-1/2"
                ref={searchRef}
              >
                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      isSearching ? "Searching..." : "Search products..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSearching}
                    className="h-10 w-[160px] sm:w-[280px] md:w-[350px] lg:w-[400px] rounded-full !border-0 bg-gray-500/10 pl-11 pr-5 text-sm !ring-0 !shadow-inset-gray-400-20 outline-none transition-all duration-200 placeholder:text-gray-600 focus:!shadow-inset-primary-800-60 focus-visible:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                  {isSearching && (
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-mivro-green/20 border-t-mivro-green"></div>
                    </div>
                  )}
                  {searchQuery && !isSearching && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {showResults && (
                    <div className="absolute top-full mt-2 w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl max-h-[450px] overflow-hidden">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-mivro-green/20 border-t-mivro-green"></div>
                        </div>
                      ) : products.length > 0 ? (
                        <div className="py-2">
                          {products.slice(0, 8).map((product, index) => (
                            <div
                              key={product.code}
                              onClick={() => {
                                router.push(
                                  `/product?code=${product.code}&name=${encodeURIComponent(product.product_name || "")}`,
                                );
                                setShowResults(false);
                                setSearchQuery("");
                              }}
                              className={cn(
                                "group cursor-pointer flex items-center gap-4 px-4 py-3 transition-all",
                                index !== 0 && "border-t border-border/30",
                              )}
                            >
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                                {getProductImageUrl(product) ? (
                                  <img
                                    src={getProductImageUrl(product)}
                                    alt={product.product_name || "Product"}
                                    className="w-full h-full object-contain p-1"
                                  />
                                ) : (
                                  <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm line-clamp-1 mb-1 group-hover:text-mivro-green transition-colors">
                                  {product.product_name || "Unknown Product"}
                                </h3>
                                {product.brands && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {product.brands}
                                  </p>
                                )}
                              </div>
                              <svg
                                className="w-5 h-5 text-muted-foreground group-hover:text-mivro-green transition-colors opacity-0 group-hover:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center">
                          <p className="text-sm text-muted-foreground">
                            No products found. Try a different search.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden items-center space-x-4 md:flex">
                {!loading &&
                  (user ? <UserProfile user={user} /> : <AuthButton />)}
                <DarkModeToggle />
              </div>
              <div className="md:hidden">
                <MobileMenu user={user} handleSignOut={handleSignOut} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
