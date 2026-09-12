import fs from "fs";
import os from "os";
import path from "path";

/**
 * Content store.
 *
 * Reads are served from the JSON files in `data/`, which is the seed the
 * original API's database was recovered into. Writes (saved-listing carts,
 * newsletter subscribers, enquiries) go to the runtime directory, which is not
 * checked in. Both live behind this module so a real database can be dropped
 * in later without touching the route handlers.
 */

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Where runtime writes land.
 *
 * On a serverless host the deployment bundle is mounted read-only (Vercel and
 * Lambda unpack it at /var/task), so writing next to the seed data fails with
 * ENOENT/EROFS. The only writable path there is the instance's temp dir, so
 * that is the fallback — per-instance and wiped when the instance is recycled.
 * Set RUNTIME_DIR to a mounted volume, or swap `runtime` below for a real
 * database, to keep writes.
 */
const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
);

const RUNTIME_DIR =
  process.env.RUNTIME_DIR ||
  (isServerless
    ? path.join(os.tmpdir(), "thanos-runtime")
    : path.join(DATA_DIR, "runtime"));

// Reassigned once if the configured directory turns out to be read-only, so
// that fallback happens at most once per process rather than on every write.
let runtimeDir = RUNTIME_DIR;

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
      fs.readFileSync(path.join(runtimeDir, file), "utf8")
    ) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
};

const READ_ONLY = ["EROFS", "EACCES", "EPERM", "ENOENT"];

const writeTo = <T>(dir: string, file: string, rows: T[]) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, file), JSON.stringify(rows, null, 2) + "\n");
};

const writeRuntime = <T>(file: string, rows: T[]) => {
  try {
    writeTo(runtimeDir, file, rows);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code || "";
    const fallback = path.join(os.tmpdir(), "thanos-runtime");
    if (!READ_ONLY.includes(code) || runtimeDir === fallback) throw err;

    // The host gave us a read-only filesystem after all. Fall back to the
    // temp dir for the life of this process so the request still succeeds.
    console.warn(
      `[db] ${runtimeDir} is not writable (${code}); writing to ${fallback} instead. ` +
        "Runtime state will not survive a restart."
    );
    runtimeDir = fallback;
    writeTo(runtimeDir, file, rows);
  }
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
