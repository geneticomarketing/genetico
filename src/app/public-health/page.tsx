import { PublicHealthClient } from "@/app/public-health/public-health-client";
import { getPublicHealthPageData } from "@/lib/cms/page-data";

export default async function PublicHealthPage() {
  const data = await getPublicHealthPageData();
  return <PublicHealthClient data={data} />;
}
