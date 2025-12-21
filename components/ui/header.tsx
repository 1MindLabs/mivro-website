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
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground",
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

const HeroTitle = ({ theme }: { theme: string }) => (
  <>
    <div className="hidden items-start sm:inline-block">
      {theme === "dark" ? (
        <Image
          src={AnalysisLogo}
          width={35}
          alt="Mivro Logo"
          className="mb-1 mr-2 inline-flex"
        />
      ) : (
        <Image
          src={AnalysisLogo}
          width={35}
          alt="Mivro Logo"
          className="mb-1 mr-2 inline-flex"
        />
      )}
    </div>

    <div className="block items-start sm:hidden">
      <div>
        {theme === "dark" ? (
          <Image
            src={AnalysisLogo}
            width={35}
            alt="Mivro Logo"
            className="mb-1 mr-2 inline-flex"
          />
        ) : (
          <Image
            src={AnalysisLogo}
            width={35}
            alt="Mivro Logo"
            className="mb-1 mr-2 inline-flex"
          />
        )}
      </div>
    </div>
  </>
);

export default function Header() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      await serverSignOut();
    } catch (error) {}
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
                  <HeroTitle theme="light" />
                  <div className="h4 ml-1">Mivro</div>
                </Link>
                <nav className="ml-6 hidden md:block" aria-label="Main menu">
                  <NavigationMenu>
                    <NavigationMenuList className="space-x-1">
                      <NavigationMenuItem>
                        <Link
                          href="/marketplace"
                          className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary-300/10 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-secondary-300/10 data-[state=open]:bg-secondary-300/10"
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
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                <div className="relative flex items-center">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 w-64 rounded-full !border-0 bg-gray-500/10 pl-10 pr-4 text-sm !ring-0 !shadow-inset-gray-400-20 outline-none transition-all duration-200 placeholder:text-gray-600 focus:!shadow-inset-primary-800-60 focus-visible:outline-none"
                  />
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
