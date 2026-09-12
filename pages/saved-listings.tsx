import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import { Header } from "components/saved-listings/Header";
import { Listings } from "components/saved-listings/Listings";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const headerContents = {
    title: "Saved Listings",
    subtitle: "Send us an enquiry about the listings you have saved here.",
    button: {
      text: "Connect with us",
    },
  };

  const listingsContents = {
    noListings: {
      title: "No listings saved",
      button: {
        text: "Explore Properties",
        link: "/properties",
      },
    },
  };

  return {
    props: {
      menu: menu,
      headerContents: headerContents,
      listingsContents: listingsContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function SavedListings({
  menu,
  headerContents,
  listingsContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="light" menu={menu}>
      <Meta
        title={headerContents.title}
        description={headerContents.subtitle}
      />
      <Header contents={headerContents} />
      <Listings contents={listingsContents} />
    </Layout>
  );
}
