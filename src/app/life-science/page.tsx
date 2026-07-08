import { SolutionsPage } from "@/components/landing/solutions-page";
import { getSolutionsContent } from "@/lib/cms/queries";

export default async function PharmaPage() {
  const content = await getSolutionsContent("pharma");
  return <SolutionsPage variant="pharma" content={content} />;
}
