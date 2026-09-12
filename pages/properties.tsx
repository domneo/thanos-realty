import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import { Header } from "components/properties/Header";
import { Listings } from "components/properties/Listings";

import { PropertiesData } from "types/content";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const headerContents = {
    title: "Explore Your Market Options",
    subtitle: "Search properties",
  };

  const getListings = async (): Promise<PropertiesData> => {
    const data = await fetchAPI(
      `api/v1/properties?published=1&sort=published_at&sort_by=desc&per_page=9`
    );
    return data?.properties;
  };

  const listings = await getListings();

  const listingsContents = {
    filters: [
      {
        label: "Precinct",
        options: [
          {
            label: "Raffles Place/Marina Bay",
            value: "Raffles Place/Marina Bay",
          },
          {
            label: "Tanjong Pagar/Shenton Way",
            value: "Tanjong Pagar/Shenton Way",
          },
          { label: "Marina", value: "Marina" },
          { label: "Beach Road/Middle Road", value: "Beach Road/Middle Road" },
          { label: "Orchard", value: "Orchard" },
          {
            label: "North - Novena/Newton",
            value: "North - Novena/Newton",
          },
          {
            label: "East - Paya Lebar/Tampines",
            value: "East - Paya Lebar/Tampines",
          },
          {
            label: "West - Alexandra/Harbourfront/Jurong",
            value: "West - Alexandra/Harbourfront/Jurong",
          },
        ],
      },
      {
        label: "Ideal Rent (psf/month)",
        options: [
          {
            label: "Below $7",
            value: "below-7",
          },
          {
            label: "$7 to $10",
            value: "7-to-10",
          },
          {
            label: "Above $10",
            value: "above-10",
          },
        ],
      },
    ],
    properties: listings,
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

export default function Properties({
  menu,
  headerContents,
  listingsContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="light" menu={menu}>
      <Meta title={"Featured Listings"} description={headerContents.title} />
      <Header contents={headerContents} />
      <Listings contents={listingsContents} />
    </Layout>
  );
}
