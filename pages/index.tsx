import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import CTA from "components/index/CTA";
import Explore from "components/index/Explore";
import FeaturedLinks from "components/index/FeaturedLinks";
import Hero from "components/index/Hero";
import Intro from "components/index/Intro";

import { CarouselsData } from "types/content";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const getCarousels = async (): Promise<CarouselsData> => {
    const data = await fetchAPI("api/v1/carousels");
    return data?.carousels;
  };

  const getSettingValue = async (settingName: string) => {
    const data = await fetchAPI(`api/v1/settings/${settingName}`);
    return data?.setting?.value;
  };

  const introContents = {
    introText: await getSettingValue("HOME_PAGE_TEXT"),
  };

  const featuredLinksContents = [
    {
      subheading: "Understand",
      title: "The Market Today",
      summary:
        "Businesses are evaluating their physical workspace needs. We're here to help.",
      link: "/articles",
    },
    {
      subheading: "Browse",
      title: "Case Stories",
      summary: "Meet our clients and view their transformation journeys.",
      link: "/case-stories",
    },
    {
      subheading: "Learn",
      title: "What We Do",
      summary:
        "We support corporates' right-sizing, staying or relocation needs.",
      link: "/what-we-do",
    },
    {
      subheading: "Meet",
      title: "Our Team",
      summary:
        "We provide a full suite of consulting and transaction services.",
      link: "/who-we-are",
    },
  ];

  const exploreContents = {
    title: "Explore your market options with us",
    button: {
      text: "Explore more",
      link: "/properties",
    },
  };

  const ctaContents = {
    title: "Discover today's modern workplaces",
    subtitle:
      "Visit our workspace. Email $HOME_CTA_EMAIL to arrange an appointment.",
    email: await getSettingValue("HOME_CTA_EMAIL"),
  };

  return {
    props: {
      menu: menu,
      carousels: await getCarousels(),
      introContents: introContents,
      featuredLinksContents: featuredLinksContents,
      exploreContents: exploreContents,
      ctaContents: ctaContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function Index({
  menu,
  carousels,
  introContents,
  featuredLinksContents,
  exploreContents,
  ctaContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="dark" menu={menu}>
      <Meta title="" description="" />
      <Hero carousels={carousels} />
      <Intro contents={introContents} />
      <FeaturedLinks contents={featuredLinksContents} />
      <Explore contents={exploreContents} />
      <CTA contents={ctaContents} />
    </Layout>
  );
}
