import { createContext } from "react";

export const SavedListingsContext = createContext<{
  saved: { property_id: string; title: string; slug: string }[];
  count: number;
  update: () => void;
}>({ saved: [], count: 0, update: () => {} });
