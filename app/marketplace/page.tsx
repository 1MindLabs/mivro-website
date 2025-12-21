import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Marketplace",
  description: "Discover and explore products in the Mivro marketplace.",
  canonical: "/marketplace",
});

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      </div>
    </div>
  );
}
