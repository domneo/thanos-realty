import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import { Header } from "components/case-stories/Header";
import { Latest } from "components/case-stories/Latest";
import { Listings } from "components/case-stories/Listings";
import Meta from "components/global/Meta";

import { CategoriesData, CaseStoriesData } from "types/content";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const headerContents = {
    title: "Case Stories",
    subtitle:
      "We help our clients unlock the potential of hybrid working",
  };

  const getListings = async (): Promise<CaseStoriesData> => {
    const data = await fetchAPI(
      `api/v1/case-stories?published=1&sort=published_at&sort_by=desc&per_page=9`
    );
    return data?.caseStories;
  };

  const listings = await getListings();
  const latestCaseStory =
    listings.data && listings.data.length > 0 ? listings.data[0] : null;

  const latestContents = {
    caption: "Latest",
    subheading: "Case Story",
    caseStory: latestCaseStory,
  };

  const getCategories = async (): Promise<CategoriesData> => {
    const data = await fetchAPI(
      `api/v1/case-story/categories?sort=name&sort_by=asc&per_page=20`
    );
    return data?.categories;
  };

  const listingsContents = {
    topicsTitle: "Category",
    caseStories: listings,
    categories: await getCategories(),
  };

  return {
    props: {
      menu: menu,
      headerContents: headerContents,
      latestContents: latestContents,
      listingsContents: listingsContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function CaseStories({
  menu,
  headerContents,
  latestContents,
  listingsContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="light" menu={menu}>
      <Meta
        title={headerContents.title}
        description={headerContents.subtitle}
      />
      <Header contents={headerContents} />
      {latestContents.caseStory && <Latest contents={latestContents} />}
      <Listings contents={listingsContents} />
    </Layout>
  );
}
