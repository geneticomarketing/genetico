import { AboutClient } from "@/app/about-us/about-client";
import { getAboutPageData } from "@/lib/cms/page-data";

export default async function AboutUsPage() {
  const data = await getAboutPageData();
  return <AboutClient data={data} />;
}
