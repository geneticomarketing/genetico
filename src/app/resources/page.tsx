import { ResourcesClient } from "@/app/resources/resources-client";
import { getResourcesPageData } from "@/lib/cms/page-data";

export default async function ResourcesPage() {
  const data = await getResourcesPageData();
  return <ResourcesClient data={data} />;
}
