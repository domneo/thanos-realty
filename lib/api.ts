import {
  CaseStoryRow,
  Category,
  MemberRow,
  PostRow,
  PropertyRow,
  runtime,
  seed,
} from "./db";
import { DEFAULT_PER_PAGE, paginate } from "./paginate";

/**
 * The `api/v1/*` surface the front end was written against, reimplemented on
 * top of the local content store. `handleApiRequest` is transport agnostic:
 * `pages/api/v1/[...path].ts` exposes it over HTTP for the browser, and
 * `utils/fetchAPI.ts` calls it in-process during static generation.
 */

export interface ApiRequest {
  method: string;
  /** Path segments after `api/v1`, e.g. `["posts", "some-slug"]`. */
  path: string[];
  query: Record<string, string | string[] | undefined>;
  body?: any;
  /** Absolute or root-relative prefix used to build paginator links. */
  baseUrl?: string;
}

export interface ApiResult {
  status: number;
  body: any;
}

const ok = (data: any): ApiResult => ({
  status: 200,
  body: { status: "success", data },
});

const fail = (status: number, message: string): ApiResult => ({
  status,
  // Deliberately no `errors` key: `utils/fetchAPI` treats that as a hard
  // failure, while pages expect a null payload to render a 404.
  body: { status: "error", success: false, message, data: null },
});

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const num = (value: string | string[] | undefined, fallback: number) => {
  const parsed = parseInt(first(value) ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const csv = (value: string | string[] | undefined) =>
  (first(value) || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

/**
 * Precinct labels are typed by hand in the page filters ("East - Paya
 * Lebar/Tampines") and don't always match the spacing stored on the property
 * ("East - Paya Lebar / Tampines"), so compare them loosely.
 */
const loose = (value: string) => value.toLowerCase().replace(/\s+/g, "");

type Sortable = Record<string, any>;

const sortRows = <T extends Sortable>(
  rows: T[],
  query: ApiRequest["query"],
  fallbackField = "published_at"
) => {
  const field = first(query.sort) || fallbackField;
  const direction = (first(query.sort_by) || "desc").toLowerCase();

  // Pages ask for sorts the underlying rows don't always support (the team
  // listing sorts members by `published_at`). Leave the stored order alone
  // rather than shuffling on a missing column.
  if (!rows.some((row) => row[field] !== undefined && row[field] !== null)) {
    return rows;
  }

  const sorted = [...rows].sort((a, b) => {
    const left = a[field];
    const right = b[field];
    if (left === right) return 0;
    if (left === undefined || left === null) return 1;
    if (right === undefined || right === null) return -1;
    if (typeof left === "number" && typeof right === "number") {
      return left - right;
    }
    return String(left).localeCompare(String(right));
  });
  return direction === "asc" ? sorted : sorted.reverse();
};

const withCategories = <T extends { categories?: Category[]; id: string }>(
  rows: T[],
  query: ApiRequest["query"]
) => {
  const slugs = csv(query.category_slug);
  const ids = csv(query.category_id);
  const excluded = csv(query.exclude_post_id);

  return rows.filter((row) => {
    if (excluded.includes(row.id)) return false;
    const categories = row.categories || [];
    if (slugs.length && !categories.some((c) => slugs.includes(c.slug))) {
      return false;
    }
    if (ids.length && !categories.some((c) => ids.includes(c.id))) {
      return false;
    }
    return true;
  });
};

const publishedOnly = <T extends { published?: number }>(
  rows: T[],
  query: ApiRequest["query"]
) => (first(query.published) === "1" ? rows.filter((r) => r.published) : rows);

const listPath = (req: ApiRequest) =>
  `${req.baseUrl || ""}api/v1/${req.path.join("/")}`;

const page = (req: ApiRequest) => ({
  page: num(req.query.page, 1),
  perPage: num(req.query.per_page, DEFAULT_PER_PAGE),
  path: listPath(req),
});

const categoriesEndpoint = (rows: Category[], req: ApiRequest) =>
  ok({
    categories: paginate(sortRows(rows, req.query, "name"), page(req)),
  });

/* -------------------------------------------------------------------------- */
/* Serialisation                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The original API selected a different set of columns per endpoint, and the
 * front end was built against those payloads — listings never carried article
 * bodies, for instance. Project rows down to the same shape so responses stay
 * the size the pages expect.
 */
const pick = <T extends Record<string, any>>(row: T, fields: string[]) => {
  const out: Record<string, any> = {};
  for (const field of fields) out[field] = row[field] ?? null;
  return out;
};

const POST_LIST_FIELDS = [
  "id",
  "title",
  "slug",
  "summary",
  "image",
  "published_at",
  "model",
  "member",
  "categories",
];

const POST_DETAIL_FIELDS = [
  "id",
  "title",
  "slug",
  "content",
  "image",
  "summary",
  "published_at",
  "model",
  "member",
  "categories",
  "members",
];

const CASE_STORY_LIST_FIELDS = [
  "id",
  "title",
  "slug",
  "summary",
  "image",
  "size",
  "precinct",
  "services",
  "published_at",
  "model",
  "categories",
];

const CASE_STORY_DETAIL_FIELDS = [
  "id",
  "user_id",
  "latest_user_id",
  "member_id",
  "title",
  "slug",
  "summary",
  "description",
  "image",
  "size",
  "precinct",
  "services",
  "featured",
  "featured_at",
  "published",
  "published_at",
  "views",
  "created_at",
  "updated_at",
  "model",
  "member",
  "categories",
];

const PROPERTY_FIELDS = [
  "id",
  "title",
  "slug",
  "summary",
  "description",
  "precinct",
  "mrt",
  "typical_floor_plate",
  "year_built",
  "building_size",
  "stories",
  "ideal_rent_price",
  "ideal_rent_text",
  "featured",
  "featured_at",
  "model",
  "image",
  "facilities",
  "images",
];

const MEMBER_FIELDS = [
  "id",
  "first_name",
  "last_name",
  "position",
  "email",
  "mobile",
  "phone",
  "image",
  "video",
  "featured",
  "featured_at",
];

const project = <T extends Record<string, any>>(rows: T[], fields: string[]) =>
  rows.map((row) => pick(row, fields));

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

const SEARCH_FIELDS = [
  "title",
  "summary",
  "description",
  "content",
  "precinct",
  "services",
] as const;

const highlight = (value: string, term: string) => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(
    new RegExp(escaped, "gi"),
    (match) => `<b class="search-term">${match}</b>`
  );
};

const matches = (row: Record<string, any>, term: string) =>
  SEARCH_FIELDS.some(
    (field) =>
      typeof row[field] === "string" && row[field].toLowerCase().includes(term)
  );

const SEARCH_RESULT_FIELDS = [
  "id",
  "title",
  "slug",
  "image",
  "summary",
  "description",
  "content",
  "published",
  "published_at",
  "views",
  "created_at",
  "updated_at",
];

/**
 * Search results are rendered by a single component, so every model has to
 * come back in the same shape — `member` in particular is a plain name here,
 * not the related record the case-story detail endpoint returns.
 */
const searchable = (row: Record<string, any>, model: string, term: string) => ({
  ...pick(row, SEARCH_RESULT_FIELDS),
  member:
    typeof row.member === "string"
      ? row.member
      : row.member
      ? [row.member.first_name, row.member.last_name].filter(Boolean).join(" ")
      : null,
  model,
  title_with_highlights: highlight(row.title, term),
});

const search = (req: ApiRequest): ApiResult => {
  const term = (first(req.query.q) || "").trim().toLowerCase();
  const model = first(req.query.model) || "";

  const posts = term
    ? seed
        .posts()
        .filter((p) => p.published && matches(p, term))
        .map((p) => searchable(p, "Post", term))
    : [];
  const caseStories = term
    ? seed
        .caseStories()
        .filter((c) => c.published && matches(c, term))
        .map((c) => searchable(c, "CaseStory", term))
    : [];
  const properties = term
    ? seed
        .properties()
        .filter((p) => p.published && matches(p, term))
        .map((p) => searchable(p, "Property", term))
    : [];

  const byModel: Record<string, any[]> = {
    Post: posts,
    CaseStory: caseStories,
    Property: properties,
  };
  const results = model
    ? byModel[model] || []
    : [...caseStories, ...posts, ...properties];

  const paginated = paginate(results, {
    ...page(req),
    perPage: num(req.query.per_page, 10),
  });

  return ok({
    ...paginated,
    query: {
      posts: posts.length,
      properties: properties.length,
      case_stories: caseStories.length,
      total: posts.length + properties.length + caseStories.length,
    },
  });
};

/* -------------------------------------------------------------------------- */
/* Saved listings (cart)                                                      */
/* -------------------------------------------------------------------------- */

interface CartItem {
  id: string;
  cart_id: string;
  session_id: string;
  property_id: string;
  created_at: string;
  updated_at: string;
}

const CART_FILE = "carts.json";

const uuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const value = char === "x" ? rand : (rand & 0x3) | 0x8;
    return value.toString(16);
  });

const now = () => new Date().toISOString().replace("T", " ").slice(0, 19);

const cartResponse = (sessionId: string, req: ApiRequest) => {
  const properties = new Map(seed.properties().map((p) => [p.id, p]));
  const items = runtime
    .read<CartItem>(CART_FILE)
    .filter((item) => item.session_id === sessionId)
    .map((item) => ({
      id: item.id,
      cart_id: item.cart_id,
      property_id: item.property_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      property: (() => {
        const property = properties.get(item.property_id);
        return property ? pick(property, PROPERTY_FIELDS) : null;
      })(),
    }));

  return ok({
    properties: paginate(items, {
      page: 1,
      perPage: Math.max(items.length, 1),
      path: `${req.baseUrl || ""}api/v1/cart`,
    }),
  });
};

const cart = (req: ApiRequest): ApiResult => {
  const sessionId =
    first(req.query.session_id) || (req.body && req.body.session_id);
  if (!sessionId) return fail(422, "session_id is required");

  if (req.method === "GET") return cartResponse(sessionId, req);

  const propertyId = req.body && req.body.property_id;
  if (!propertyId) return fail(422, "property_id is required");

  const items = runtime.read<CartItem>(CART_FILE);

  if (req.method === "DELETE") {
    runtime.write(
      CART_FILE,
      items.filter(
        (item) =>
          !(item.session_id === sessionId && item.property_id === propertyId)
      )
    );
    return cartResponse(sessionId, req);
  }

  if (req.method === "POST") {
    const exists = items.some(
      (item) => item.session_id === sessionId && item.property_id === propertyId
    );
    if (!exists) {
      const timestamp = now();
      items.push({
        id: uuid(),
        cart_id: sessionId,
        session_id: sessionId,
        property_id: propertyId,
        created_at: timestamp,
        updated_at: timestamp,
      });
      runtime.write(CART_FILE, items);
    }
    return cartResponse(sessionId, req);
  }

  return fail(405, `${req.method} not allowed on api/v1/cart`);
};

/* -------------------------------------------------------------------------- */
/* Inbound form submissions                                                   */
/* -------------------------------------------------------------------------- */

const record = (file: string, payload: Record<string, any>) => {
  const rows = runtime.read<Record<string, any>>(file);
  const row = { id: uuid(), ...payload, created_at: now() };
  rows.push(row);
  runtime.write(file, rows);
  return row;
};

const subscribe = (req: ApiRequest): ApiResult => {
  const email = req.body && req.body.email;
  if (!email) return fail(422, "email is required");
  return ok({ subscriber: record("subscribers.json", { email }) });
};

const enquiry = (req: ApiRequest, kind: string): ApiResult => {
  const body = req.body || {};
  if (!body.email) return fail(422, "email is required");
  return ok({ enquiry: record("enquiries.json", { kind, ...body }) });
};

/* -------------------------------------------------------------------------- */
/* Router                                                                     */
/* -------------------------------------------------------------------------- */

export const handleApiRequest = async (req: ApiRequest): Promise<ApiResult> => {
  const [resource, ...rest] = req.path;
  const method = req.method.toUpperCase();
  const readOnly = method === "GET" || method === "HEAD";

  switch (resource) {
    case "carousels": {
      if (!readOnly) break;
      const rows = seed
        .carousels()
        .filter((c) => c.published && !c.deleted_at)
        .sort((a, b) => a.position - b.position);
      return ok({ carousels: paginate(rows, page(req)) });
    }

    case "settings": {
      if (!readOnly) break;
      const name = rest[0];
      const setting = seed.settings().find((s) => s.name === name);
      if (!setting) return fail(404, `Unknown setting "${name}"`);
      return ok({ setting });
    }

    case "posts": {
      if (!readOnly) break;
      if (rest[0]) {
        const post = seed.posts().find((p) => p.slug === rest[0]);
        return post
          ? ok(pick(post, POST_DETAIL_FIELDS))
          : fail(404, "Post not found");
      }
      const rows = withCategories<PostRow>(
        publishedOnly(seed.posts(), req.query),
        req.query
      );
      return ok({
        posts: paginate(
          project(sortRows(rows, req.query), POST_LIST_FIELDS),
          page(req)
        ),
      });
    }

    case "post": {
      if (!readOnly || rest[0] !== "categories") break;
      return categoriesEndpoint(seed.postCategories(), req);
    }

    case "case-stories": {
      if (!readOnly) break;
      if (rest[0]) {
        const story = seed.caseStories().find((c) => c.slug === rest[0]);
        return story
          ? ok(pick(story, CASE_STORY_DETAIL_FIELDS))
          : fail(404, "Case story not found");
      }
      const rows = withCategories<CaseStoryRow>(
        publishedOnly(seed.caseStories(), req.query),
        req.query
      );
      return ok({
        caseStories: paginate(
          project(sortRows(rows, req.query), CASE_STORY_LIST_FIELDS),
          page(req)
        ),
      });
    }

    case "case-story": {
      if (!readOnly || rest[0] !== "categories") break;
      return categoriesEndpoint(seed.caseStoryCategories(), req);
    }

    case "properties": {
      if (!readOnly) break;
      if (rest[0]) {
        const property = seed.properties().find((p) => p.slug === rest[0]);
        return property
          ? ok(pick(property, PROPERTY_FIELDS))
          : fail(404, "Property not found");
      }

      let rows: PropertyRow[] = publishedOnly(seed.properties(), req.query);

      const precinct = first(req.query.precinct);
      if (precinct) {
        rows = rows.filter((p) => loose(p.precinct) === loose(precinct));
      }

      const idealRent = first(req.query.ideal_rent);
      if (idealRent) {
        const ranges: Record<string, [number, number]> = {
          "below-7": [0, 7],
          "7-to-10": [7, 10],
          "above-10": [10, Infinity],
        };
        const range = ranges[idealRent];
        if (range) {
          rows = rows.filter(
            (p) =>
              p.ideal_rent_price >= range[0] && p.ideal_rent_price < range[1]
          );
        }
      }

      return ok({
        properties: paginate(
          project(sortRows(rows, req.query), PROPERTY_FIELDS),
          page(req)
        ),
      });
    }

    case "facilities": {
      if (!readOnly) break;
      return ok({ facilities: paginate(seed.facilities(), page(req)) });
    }

    case "members": {
      if (!readOnly) break;
      const rows = sortRows<MemberRow>(
        seed.members(),
        req.query,
        "featured_at"
      );
      return ok({ members: paginate(project(rows, MEMBER_FIELDS), page(req)) });
    }

    case "search": {
      if (!readOnly) break;
      return search(req);
    }

    case "cart":
      return cart(req);

    case "subscribers": {
      if (method !== "POST") break;
      return subscribe(req);
    }

    case "contact": {
      if (method !== "POST") break;
      return enquiry(
        req,
        rest[0] === "saved-listings" ? "saved-listings" : "general"
      );
    }
  }

  return fail(404, `No route for ${method} api/v1/${req.path.join("/")}`);
};
