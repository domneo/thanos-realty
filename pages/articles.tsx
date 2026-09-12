import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import { Header } from "components/articles/Header";
import { Latest } from "components/articles/Latest";
import { Listings } from "components/articles/Listings";
import { MostRead } from "components/articles/MostRead";
import Meta from "components/global/Meta";

import { CategoriesData, PostsData } from "types/content";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const headerContents = {
    title: "Articles",
  };

  const getLatest = async (): Promise<PostsData> => {
    const data = await fetchAPI(
      "api/v1/posts?published=1&sort=published_at&sort_by=desc&per_page=3"
    );
    return data?.posts;
  };

  const latestContents = {
    title: "Latest",
    posts: await getLatest(),
  };

  const getMostRead = async (): Promise<PostsData> => {
    const data = await fetchAPI(
      "api/v1/posts?published=1&sort=views&sort_by=desc&per_page=5"
    );
    return data?.posts;
  };

  const mostReadContents = {
    title: "Most Read",
    posts: await getMostRead(),
  };

  const getListings = async (): Promise<PostsData> => {
    const data = await fetchAPI(
      `api/v1/posts?published=1&sort=published_at&sort_by=desc&per_page=9`
    );
    return data?.posts;
  };

  const getCategories = async (): Promise<CategoriesData> => {
    const data = await fetchAPI(
      `api/v1/post/categories?sort=name&sort_by=asc&per_page=20`
    );
    return data?.categories;
  };

  const listingsContents = {
    topicsTitle: "Your topics",
    posts: await getListings(),
    categories: await getCategories(),
  };

  return {
    props: {
      menu: menu,
      headerContents: headerContents,
      latestContents: latestContents,
      mostReadContents: mostReadContents,
      listingsContents: listingsContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function Articles({
  menu,
  headerContents,
  latestContents,
  mostReadContents,
  listingsContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="light" menu={menu}>
      <Meta title={headerContents.title} />
      <Header contents={headerContents} />
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <Latest contents={latestContents} />
            </div>
            <div className="col-md-10 col-lg-4">
              <MostRead contents={mostReadContents} />
            </div>
          </div>
        </div>
      </div>
      <Listings contents={listingsContents} />
    </Layout>
  );
}
