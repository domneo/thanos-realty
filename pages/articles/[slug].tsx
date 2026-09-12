import { GetStaticProps, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Body from "components/article/Body";
import Header from "components/article/Header";
import Members from "components/article/Members";
import RelatedArticles from "components/article/RelatedArticles";
import Meta from "components/global/Meta";

import { PostData, PostsData } from "types/content";

export const getStaticPaths = async () => {
  const getArticles = async (): Promise<PostsData> => {
    const data = await fetchAPI(
      `api/v1/posts?published=1&sort=published_at&sort_by=desc&per_page=9999`
    );
    return data?.posts;
  };

  const articleSlugs = (await getArticles()).data.map(
    (article) => article.slug
  );

  return {
    paths: articleSlugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const getPost = async (): Promise<PostData> => {
    const data = await fetchAPI(`api/v1/posts/${params?.slug}`);
    return data;
  };

  const post = await getPost();
  if (!post) return { notFound: true };

  // query 3 posts containing current post's categories
  const getRelatedPosts = async (): Promise<PostsData> => {
    const data = await fetchAPI(
      `api/v1/posts?published=1&sort=created_at&sort_by=desc&per_page=3&category_slug=${post.categories
        ?.map((category) => category.slug)
        .join(",")}&exclude_post_id=${post.id}&page=1`
    );
    return data?.posts;
  };

  return {
    props: {
      menu: menu,
      post: post,
      relatedPosts: await getRelatedPosts(),
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

const Article = ({
  menu,
  post,
  relatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { image, title, summary, members, published_at, categories, content } =
    post;

  return (
    <Layout mode="light" menu={menu}>
      <Meta title={title} description={summary} image={image} />
      <article>
        <Header
          image={image}
          title={title}
          summary={summary}
          author={members?.[0]}
          published_at={published_at}
          categories={categories}
        />
        <Body title={title} summary={summary} content={content} />
        {members && members.length > 0 && (
          <Members title="Get in touch" members={members} />
        )}
        <RelatedArticles relatedPosts={relatedPosts} />
      </article>
    </Layout>
  );
};

export default Article;
