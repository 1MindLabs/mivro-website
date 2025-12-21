"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-8 w-8 items-center justify-center text-gray-800 duration-200 hover:text-gray-700">
      <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-secondary-300/10">
        <input
          className="hidden"
          type="checkbox"
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          checked={theme === "light"}
        />
        {theme === "dark" ? (
          <MoonStar strokeWidth={1} className="h-5 w-5" />
        ) : (
          <Sun strokeWidth={1} className="h-5 w-5" />
        )}
      </label>
    </div>
  );
}
