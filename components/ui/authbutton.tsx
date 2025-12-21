import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function AuthButton() {
  return (
    <div className="hidden flex-row items-center space-x-1 md:flex">
      <div className="flex flex-row items-center space-x-1">
        <CircleUserRound strokeWidth={1} className="h-5 w-5" />

        <Link
          className="text-gray-800 transition duration-150 ease-in-out hover:text-primary-800"
          href={"/signin"}
        >
          Sign In
        </Link>
        <span className="text-gray-400 opacity-50">/</span>
        <Link
          className="text-gray-800 transition duration-150 ease-in-out hover:text-primary-800"
          href={"/signup"}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
