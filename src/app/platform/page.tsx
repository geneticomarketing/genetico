import { PlatformClient } from "@/app/platform/platform-client";
import { getPlatformPageData } from "@/lib/cms/page-data";

export default async function PlatformPage() {
  const data = await getPlatformPageData();
  return <PlatformClient data={data} />;
}
