import { type QueryParams } from "sanity";
import { sanityClient } from "sanity:client";

const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;
console.log('token', token)
export async function loadQuery<QueryResponse>({
    query,
    params,
  }: {
    query: string;
    params?: QueryParams;
  }) {
    if (visualEditingEnabled && !token) {
      throw new Error(
        "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
      );
    }
  
    const perspective = visualEditingEnabled ? "previewDrafts" : "published";
  
    const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
      query,
      params ?? {},
      {
        filterResponse: false,
        perspective,
        resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
        stega: visualEditingEnabled,
        ...(visualEditingEnabled ? { token } : {}),
      },
    );
  
    return {
      data: result,
      sourceMap: resultSourceMap,
      perspective,
    };
  }