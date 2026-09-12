import fs from "fs";
import path from "path";

/**
 * Content store.
 *
 * Reads are served from the JSON files in `data/`, which is the seed the
 * original API's database was recovered into. Writes (saved-listing carts,
 * newsletter subscribers, enquiries) go to `data/runtime/`, which is not
 * checked in. Both live behind this module so a real database can be dropped
 * in later without touching the route handlers.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const RUNTIME_DIR = path.join(DATA_DIR, "runtime");

const cache = new Map<string, unknown[]>();

const readSeed = <T>(file: string): T[] => {
  // Cache in production only, so editing data/*.json shows up on next request
  // during development.
  const cached = cache.get(file);
  if (cached && process.env.NODE_ENV === "production") return cached as T[];

  const rows = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, file), "utf8")
  ) as T[];
  cache.set(file, rows);
  return rows;
};

const readRuntime = <T>(file: string): T[] => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(RUNTIME_DIR, file), "utf8")
    ) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
};

const writeRuntime = <T>(file: string, rows: T[]) => {
  fs.mkdirSync(RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(RUNTIME_DIR, file),
    JSON.stringify(rows, null, 2) + "\n"
  );
};

export const seed = {
  carousels: () => readSeed<Carousel>("carousels.json"),
  settings: () => readSeed<Setting>("settings.json"),
  posts: () => readSeed<PostRow>("posts.json"),
  postCategories: () => readSeed<Category>("post-categories.json"),
  caseStories: () => readSeed<CaseStoryRow>("case-stories.json"),
  caseStoryCategories: () => readSeed<Category>("case-story-categories.json"),
  properties: () => readSeed<PropertyRow>("properties.json"),
  members: () => readSeed<MemberRow>("members.json"),
  facilities: () => readSeed<Facility>("facilities.json"),
};

export const runtime = {
  read: readRuntime,
  write: writeRuntime,
};

export interface Carousel {
  id: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
  image: string;
  position: number;
  published: number;
  published_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  name: string;
  description: string;
  value: string;
  char_limit: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  counts: number;
  created_at: string;
  updated_at: string;
}

export interface MemberRow {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  mobile: string | null;
  phone: string | null;
  image: string | null;
  video: string | null;
  featured: number;
  featured_at: string | null;
}

export interface PostRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  views: number;
  model: string;
  member: string | null;
  categories: Category[];
  members: MemberRow[];
}

export interface CaseStoryRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  size: string;
  precinct: string;
  services: string;
  published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  views: number;
  model: string;
  member: string | null;
  member_id: string | null;
  categories: Category[];
}

export interface Facility {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyAssetRow {
  id: string;
  property_id: string;
  url: string;
  description: string | null;
  thumbnail: string;
  is_main: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  precinct: string;
  mrt: string;
  typical_floor_plate: string;
  year_built: number;
  building_size: number;
  stories: number;
  ideal_rent_price: number;
  ideal_rent_text: string;
  featured: number;
  featured_at: string | null;
  published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  model: string;
  image: string;
  facilities: Facility[];
  images: PropertyAssetRow[];
}
