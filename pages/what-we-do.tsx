import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import CTA from "components/what-we-do/CTA";
import Hero from "components/what-we-do/Hero";
import KeyServices from "components/what-we-do/KeyServices";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const getSettingValue = async (settingName: string) => {
    const data = await fetchAPI(`api/v1/settings/${settingName}`);
    return data?.setting?.value;
  };

  const heroContents = {
    caption: "WHAT WE DO",
    title: "Together, we will transform hybrid working into a business advantage",
    subtitle:
      "We believe that successful workplace transformation requires a seamless process from inception to implementation",
  };

  const keyServicesContents = {
    keyServices: [
      {
        name: "Workspace\nConsulting",
        title:
          "Today's best workplaces understand its users. We capture a SEAMLESS multitude of user data points to tailor a workplace that uniquely works for your business.",
        description:
          "How better to understand what inspires user productivity at work than formulating the workplace with its users. We capture and benchmark a seamless multitude of user behavioural and utilisation data points to tailor a workplace strategy that transforms the way you work according to your business objectives in the future of work. Connect with us for a quick online user survey to determine how productive your current workplace is for users returning to the office.",
        offerings: [
          "Multi-directional user engagements",
          "Workplace resilience assessment",
          "Occupancy analysis",
          "Hybrid working enablement",
          "Real estate optimisation",
        ],
      },
      {
        name: "Change\nImplementation",
        title:
          "Because a workplace transformation is as successful as the level of user buy-in, we incept change SEAMLESSLY with users and user-led change.",
        description:
          "Because a workplace transformation is only as successful as the level of user buy-in, change is seamlessly incepted when we start workplace strategy formulation with users and nurturing user-led change. Simple yet effective, users will buy-in to change they have had a say in formulating. Connect with us for a quick online user survey to determine areas that are flagging need for change.",
        offerings: [
          "Townhall and webinars",
          "Visual communications",
          "Feedback sessions",
          "Training workshops",
          "Move planning",
          "Post occupancy survey",
        ],
      },
      {
        name: "Secure\nSpace",
        title:
          "The one team that formulates your unique workplace strategy, and SEAMLESSLY goes to market with you for space without any loss in translation.",
        description:
          "The same team undertakes market engagement, negotiations, scenario planning and financial analysis that takes out the guess work in determining the optimal business case whether right-sizing, up-sizing, relocating, or renewing space. Importantly, this seamless process will de-risk the project from lengthy due diligence, prolonged market engagement and negotiations, time and budget overrun. Connect with us for a quick market scan of space opportunities.",
        offerings: ["a", "b", "c"],
      },
      {
        name: "Fit-out\nManagement",
        title:
          "Our difference is in one team delivering a SEAMLESS process that is up to 30% more efficient in time and cost.",
        description:
          "While the conventional way of setting up office space requires various vendors, it is falling short in the pace of today's workplace changes. At Thanos Realty, the same team journeys with you seamlessly from formulating your unique workplace strategy, to securing optimal amount of space and delivering a corresponding fit out. Our difference and value to you is in delivering a seamless process from inception to implementation because it is up to 30% more efficient in time and cost just from mitigating any loss in translation. Connect with us for a quick fit out budget and project time estimate.",
        offerings: [
          "Testfit and zoning planning",
          "Concept design development",
          "Design development workshops",
          "Time manage the design and construction phases",
        ],
      },
    ],
    offeringsTitle: "Our key service offerings:",
  };

  const ctaContents = {
    title: "Thinking of a project?",
    button: {
      text: "Get in touch with us",
      link: `mailto:${await getSettingValue("HOME_CTA_EMAIL")}`,
    },
  };

  return {
    props: {
      menu: menu,
      heroContents: heroContents,
      keyServicesContents: keyServicesContents,
      ctaContents: ctaContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function WhatWeDo({
  menu,
  heroContents,
  keyServicesContents,
  ctaContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="dark" menu={menu}>
      <Meta title="What We Do" description={heroContents.subtitle} />
      <Hero contents={heroContents} />
      <KeyServices contents={keyServicesContents} />
      <CTA contents={ctaContents} />
    </Layout>
  );
}
