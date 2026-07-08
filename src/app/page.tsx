import { HomeClient } from "@/app/home-client";
import { getHomePageData } from "@/lib/cms/page-data";

export default async function Home() {
  const data = await getHomePageData();

  return <HomeClient data={data} />;
}
