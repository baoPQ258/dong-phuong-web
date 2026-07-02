import qs from "qs";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

export async function fetchStrapi<T>(
  endpoint: string,
  query: Record<string, unknown> = {},
): Promise<T> {
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 }, // ISR: cache 60 giây
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${url}`);

  const json = await res.json();
  return json;
}

export function getStrapiMedia(url: string | null): string {
  if (!url) return "/images/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
