import "dotenv/config";
import { getPayload } from "payload";

import config from "../../payload.config";
import { DEFAULT_HOME_PAGE } from "../../lib/cms/defaults/home";

async function seedHomeFaqs() {
  const payload = await getPayload({ config });
  const faqSection = DEFAULT_HOME_PAGE.faqSection;

  await payload.updateGlobal({
    slug: "home-faqs",
    data: {
      eyebrow: faqSection.eyebrow,
      heading: faqSection.heading,
      description: faqSection.description,
      items: faqSection.items.map(({ question, answer }) => ({ question, answer })),
    },
  });

  const saved = await payload.findGlobal({ slug: "home-faqs" });
  console.log(
    `Seeded home-faqs: ${saved.items?.length ?? 0} items — ${saved.heading ?? "(no heading)"}`,
  );
  process.exit(0);
}

seedHomeFaqs().catch((error) => {
  console.error("Failed to seed home-faqs:", error);
  process.exit(1);
});
