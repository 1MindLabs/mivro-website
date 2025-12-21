import VerificationComponent from "@/components/auth/verification";
import { Suspense } from "react";

export default function Verification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationComponent />
    </Suspense>
  );
}
