import { GetStaticProps, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Body from "components/case-story/Body";
import CTA from "components/case-story/CTA";
import Header from "components/case-story/Header";
import { PropertyInfo } from "components/case-story/PropertyInfo";
import RelatedCaseStories from "components/case-story/RelatedCaseStories";
import Meta from "components/global/Meta";

import { CaseStoryData, CaseStoriesData } from "types/content";

export const getStaticPaths = async () => {
  const getCaseStories = async (): Promise<CaseStoriesData> => {
    const data = await fetchAPI(
      `api/v1/case-stories?published=1&sort=published_at&sort_by=desc&per_page=9999`
    );
    return data?.caseStories;
  };

  const caseStorySlugs = (await getCaseStories()).data.map(
    (caseStory) => caseStory?.slug
  );

  return {
    paths: caseStorySlugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const getSettingValue = async (settingName: string) => {
    const data = await fetchAPI(`api/v1/settings/${settingName}`);
    return data?.setting?.value;
  };

  const getCaseStory = async (): Promise<CaseStoryData> => {
    const data = await fetchAPI(`api/v1/case-stories/${params?.slug}`);
    return data;
  };

  const caseStory = await getCaseStory();
  if (!caseStory) return { notFound: true };

  // query 3 case stories containing current case stories' categories
  const getRelatedCaseStories = async (): Promise<CaseStoriesData> => {
    const data = await fetchAPI(
      `api/v1/case-stories?published=1&sort=published_at&sort_by=desc&per_page=3&category_slug=${caseStory?.categories
        ?.map((category) => category.slug)
        .join(",")}&exclude_post_id=${caseStory.id}&page=1`
    );
    return data?.caseStories;
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
      caseStory: caseStory,
      ctaContents: ctaContents,
      relatedCaseStories: await getRelatedCaseStories(),
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

const CaseStories = ({
  menu,
  caseStory,
  ctaContents,
  relatedCaseStories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    image,
    title,
    summary,
    description,
    member,
    published_at,
    categories,
    precinct,
    size,
    services,
  } = caseStory;

  return (
    <Layout mode="light" menu={menu}>
      <Meta title={title} description={summary} image={image} />
      <article>
        <Header
          image={image}
          title={title}
          summary={summary}
          author={member}
          published_at={published_at}
          categories={categories}
        />
        <PropertyInfo precinct={precinct} size={size} services={services} />
        <Body title={title} summary={summary} content={description} />
        <CTA contents={ctaContents} />
        <RelatedCaseStories relatedCaseStories={relatedCaseStories} />
      </article>
    </Layout>
  );
};

export default CaseStories;
