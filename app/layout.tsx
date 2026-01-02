import Header from "@/components/ui/header";
import { Toaster } from "@/components/ui/sonner";
import PageIllustration from "@/components/page-illustration";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./css/style.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={`bg-background font-sans tracking-tight text-gray-900 antialiased overflow-y-scroll`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col overflow-hidden">
            <Header />
            <div className="relative grow">
              <PageIllustration />
              {children}
            </div>
            <Toaster position="bottom-right" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
