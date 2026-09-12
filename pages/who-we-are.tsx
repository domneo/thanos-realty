import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import { Intro } from "components/who-we-are/Intro";
import { Members } from "components/who-we-are/Members";

import { MembersData } from "types/content";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const introContents = {
    title: "Who We Are",
    subtitle: "What makes us extraordinary is our focus on making change happen.",
  };

  const getMembers = async (): Promise<MembersData> => {
    const data = await fetchAPI(
      "api/v1/members?sort=published_at&sort_by=desc&per_page=100"
    );
    return data?.members;
  };

  const members = await getMembers();

  const membersContents = {
    members: members,
  };

  return {
    props: {
      menu: menu,
      introContents: introContents,
      membersContents: membersContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

export default function WhoWeAre({
  menu,
  introContents,
  membersContents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout mode="light" menu={menu}>
      <Meta title="Who We Are" description={introContents.subtitle} />
      <Intro contents={introContents} />
      <Members contents={membersContents} />
    </Layout>
  );
}
