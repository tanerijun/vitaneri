import { OGImageRoute } from "astro-og-canvas";
import { type CollectionEntry, getCollection } from "astro:content";
import { siteInfo } from "../../data/site-info";

async function getPagesToGenerate() {
  const entries = await getCollection("posts");

  const map: Record<string, CollectionEntry<"posts">> = {};

  for (const entry of entries) {
    map[entry.slug] = entry;
  }

  return map;
}

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: await getPagesToGenerate(),

  getImageOptions: (_path, page: CollectionEntry<"posts">) => ({
    title: page.data.title,
    logo: {
      path: "./public/android-chrome-96x96.png",
    },
    bgGradient: [[24, 24, 27]],
    padding: 80,
    font: {
      title: {
        color: [244, 244, 245],
        weight: "Bold",
        families: ["Atkinson Hyperlegible"],
      },
    },
    fonts: [`${siteInfo.url}/fonts/Atkinson-Hyperlegible-Bold-102a.woff2`],
  }),
});
