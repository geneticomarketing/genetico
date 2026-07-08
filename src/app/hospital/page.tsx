import { SolutionsPage } from "@/components/landing/solutions-page";
import { getSolutionsContent } from "@/lib/cms/queries";

export default async function HospitalPage() {
  const content = await getSolutionsContent("hospital");
  return <SolutionsPage variant="hospital" content={content} />;
}
