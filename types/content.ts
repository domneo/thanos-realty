export interface CarouselsData {
  data: {
    id?: string;
    title?: string;
    description?: string;
    cta_text?: string;
    cta_link?: string;
    image?: string;
  }[];
}

export interface PostsData {
  data: PostData[];
  from: number;
  to: number;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string;
  prev_page_url: string;
}

export interface PostData {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  image?: string;
  content?: string;
  tags?: string;
  published?: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  categories?: CategoryData[];
  members?: MemberData[];
}

export interface CaseStoriesData {
  data: CaseStoryData[];
  from: number;
  to: number;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string;
  prev_page_url: string;
}

export interface CaseStoryData {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  image?: string;
  description?: string;
  categories?: CategoryData[];
  precinct?: string;
  size?: string;
  services?: string;
  published?: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  member?: MemberData;
  member_id?: string;
}

export interface CategoriesData {
  data: CategoryData[];
  from: number;
  to: number;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CategoryData {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  counts?: number;
}

export interface PropertiesData {
  data: PropertyData[];
  from: number;
  to: number;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string;
  prev_page_url: string;
}

export interface PropertyData {
  id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  images?: PropertyAsset[];
  description?: string;
  precinct?: string;
  mrt?: string;
  typical_floor_plate?: string;
  year_built?: number;
  building_size?: number;
  stories?: number;
  ideal_rent_price?: number;
  ideal_rent_text?: string;
  facilities: FacilityData[];
  published?: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  member_id?: string;
}

export interface FacilityData {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyAsset {
  id: string;
  property_id: string;
  url: string;
  description: string;
  thumbnail: string;
  is_main: number;
  created_at: string;
  updated_at: string;
}

export interface DepartmentsData {
  data: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    members: MemberData[];
  }[];
}

export interface MembersData {
  data: {
    id?: string;
    slug?: string;
    first_name?: string;
    last_name?: string;
    position?: string;
    image?: string;
    video?: string;
    department?: {
      id: string;
      slug: string;
      name: string;
      description: string;
    };
    email?: string;
    phone?: string;
    linkedin?: string;
    profile?: string;
  }[];
}

export interface MemberData {
  id?: string;
  slug?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  image?: string;
  video?: string;
  department?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  linkedin?: string;
  profile?: string;
}

export interface SettingsData {
  data: {
    id?: string;
    name?: string;
    description?: string;
    value?: string;
    char_limit?: number;
  }[];
}

export interface SearchResultsData {
  current_page?: number;
  data?: SearchResultData[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: {
    url?: string;
    label?: string;
    active?: boolean;
  }[];
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
  query?: {
    posts?: number;
    properties?: number;
    case_stories?: number;
    total?: number;
  };
}

export interface SearchResultData {
  id?: string;
  user_id?: string;
  latest_user_id?: string;
  title?: string;
  title_with_highlights?: string;
  slug?: string;
  image?: string;
  summary?: string;
  description?: string;
  content?: string;
  featured?: string;
  featured_at?: string;
  published?: number;
  published_at?: string;
  member?: string;
  views?: number;
  searchable_text?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  model?: string;
}
