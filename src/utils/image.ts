import imageUrlBuilder from "@sanity/image-url";
//import type { Image } from "@sanity/types";
import { sanityClient } from "sanity:client";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityAsset) {
  return builder.image(source).auto("format");
}
