import { v4 as uuidv4 } from "uuid";

export const menu = [
  {
    id: uuidv4(),
    title: "What we do",
    link: "/what-we-do",
  },
  {
    id: uuidv4(),
    title: "Who we are",
    link: "/who-we-are",
  },
  {
    id: uuidv4(),
    title: "Content + Resources",
    children: [
      {
        id: uuidv4(),
        title: "Articles",
        link: "/articles",
      },
      {
        id: uuidv4(),
        title: "Case Stories",
        link: "/case-stories",
      },
      {
        id: uuidv4(),
        title: "Featured Listings",
        link: "/properties",
      },
    ],
  },
];
