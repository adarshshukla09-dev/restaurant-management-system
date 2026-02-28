import FeatureSection from "@/components/landingPage/FeatureSection";
import Hero from "@/components/landingPage/HeroSection";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
    <div className="-mt-24">
     <Hero/>
<div className="bg-white">
        <FeatureSection />
        </div>
     </div>
    </>
  );
}