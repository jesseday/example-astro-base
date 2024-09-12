import contentful, { type CreateClientParams } from "contentful";

export default function client(config?: CreateClientParams) {
  const defaults = {
    space: import.meta.env.CONTENTFUL_SPACE,
    environment: import.meta.env.CONTENTFUL_ENVIRONMENT,
    accessToken: import.meta.env.PREVIEW
      ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
      : import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    host: import.meta.env.PREVIEW
      ? "preview.contentful.com"
      : "host.contentful.com",
  };

  return contentful.createClient({
    ...defaults,
    ...(config || {}),
  });
}

interface Entry {
  sys: {
    id: string;
  };
}

interface RequestParams {
  skip: number;
  limit: number;
}

interface RequestResponse {
  total: number;
  items: Entry[];
}

export async function getAll(
  request: (params: RequestParams) => Promise<RequestResponse>,
  limit = 100,
): Promise<Entry[]> {
  let skip = 0;
  let items: Entry[] = [];
  let total;

  do {
    const entries = await request({ skip, limit });
    items = items.concat(entries.items);

    if (!total) {
      total = entries.total;
    }

    skip += limit;
  } while (skip < total);

  return items;
}
