import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MetadataProps = {
  title?: string;
  description?: string;
  canonical: string;
};

const defaultMetadata = {
  title: "Mivro: Scan It. Know It.",
  description:
    "Cross-platform app and web extension for personalized product profiling in food, drink, cosmetic, medicine, and pet food categories.",
};

export const constructMetadata = ({
  title,
  description = defaultMetadata.description,
  canonical = "/",
}: MetadataProps) => {
  return {
    metadataBase: new URL("https://mivro.org"),
    title: title ? `${title} - Mivro` : defaultMetadata.title,
    description,
    keywords: ["mivro", "ai barcode scanner", "product analyser"],
    alternates: {
      canonical,
    },
    authors: [
      {
        name: "Areeb Ahmed",
        url: "https://github.com/areebahmeddd",
      },
      {
        name: "Shivansh Karan",
        url: "https://github.com/SpaceTesla",
      },
      {
        name: "Rishi Chirchi",
        url: "https://github.com/rishichirchi",
      },
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },
  };
};
