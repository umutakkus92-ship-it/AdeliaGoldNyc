import type { Metadata } from "next";
import { StoryView } from "@/components/views/StoryView";
import { SLOGANS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${SLOGANS.heritage} From the Grand Bazaar of Istanbul to West New York, New Jersey.`,
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return <StoryView />;
}
