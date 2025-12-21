import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";
import { Suspense } from "react";
import DashboardClient from "./dashboard-client";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/dashboard",
});

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
