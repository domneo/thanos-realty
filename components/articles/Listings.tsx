import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

import media from "styles/media";

import Article from "./Article/Article";
import { Pagination } from "./Article/Pagination";

import { CategoriesData, PostsData } from "types/content";

interface ListingsProps {
  contents: {
    topicsTitle: string;
    posts: PostsData;
    categories: CategoriesData;
  };
}

export const Listings = ({ contents }: ListingsProps) => {
  const { topicsTitle, posts, categories } = contents;

  // selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // article listings
  const [articles, setArticles] = useState<PostsData>(posts);
  const getArticles = async (page?: number) => {
    const category = selectedCategory !== "all" ? selectedCategory : "";
    const res = await fetch(
      `/api/v1/posts?published=1&sort=published_at&sort_by=desc&per_page=9&page=${
        page || 1
      }&category_id=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }
    setArticles(json.data?.posts);
  };
  // Load 1st page of posts on load
  useEffect(() => {
    getArticles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On selectedCategory change, get articles for selected category
  useEffect(() => {
    getArticles(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <Element name="articleListings" className="container-fluid py-5 py-md-6">
      <div className="container-lg">
        <div className="d-flex flex-column flex-md-row align-items-start">
          <TopicsTitle className="flex-shrink-0 subheading sm fw-bold">
            {topicsTitle}
          </TopicsTitle>
          <div className="text-md-center">
            <CategoryButton
              className={`${selectedCategory === "all" ? "is-selected" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All ({posts.total})
            </CategoryButton>
            {categories?.data.map((category) => {
              return (
                <CategoryButton
                  key={category.id}
                  className={`${
                    selectedCategory === category.id ? "is-selected" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id || "")}
                >
                  {category.name} ({category.counts})
                </CategoryButton>
              );
            })}
          </div>
        </div>
        <Results>
          Showing{" "}
          <span className="fw-bold">
            {articles?.from || 1}-{articles?.to || 1}
          </span>{" "}
          of <span className="fw-bold">{articles?.total || 0}</span> results
        </Results>
        <div className="row row-cols-md-2 row-cols-xl-3">
          {articles?.data?.map((post, i) => {
            if (post) {
              const publishedDate = DateTime.fromSQL(post.published_at || "", {
                zone: process.env.NEXT_PUBLIC_TIMEZONE,
              }).toFormat("dd LLLL yyyy");

              return (
                <div key={post.id} className="col mb-5">
                  <Article
                    index={i}
                    slug={post.slug}
                    title={post.title}
                    summary={post.summary}
                    image={post.image}
                    categories={post.categories}
                    publishedDate={publishedDate}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="row mt-md-5">
          <div className="order-md-2 col-md-3 d-flex align-items-center justify-content-end text-end">
            <Results>
              Showing{" "}
              <span className="fw-bold">
                {articles?.from || 1}-{articles?.to || 1}
              </span>{" "}
              of <span className="fw-bold">{articles?.total || 0}</span> results
            </Results>
          </div>
          <div className="col-md-6 offset-md-3 d-flex justify-content-center pt-3">
            <Pagination
              current_page={articles.current_page}
              last_page={articles.last_page}
              scrollTarget={"articleListings"}
              getArticles={getArticles}
            />
          </div>
        </div>
      </div>
    </Element>
  );
};

const TopicsTitle = styled.p`
  color: var(--bs-gray-700);
  padding: 1rem 0;
  margin: 0 2rem 0 0;
`;

const CategoryButton = styled.button`
  background: transparent;
  color: var(--bs-black);
  border: 1px solid var(--bs-gray-500);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  margin: 0 1rem 1rem 0;
  font-size: 1rem;

  &:hover,
  &:focus {
    background: var(--bs-gray-200);
  }

  &.is-selected {
    background: var(--bs-primary);
    color: var(--bs-white);
    border: 1px solid var(--bs-primary);
    font-weight: 600;
  }

  @media ${media.md} {
    padding: 0.75rem 1.5rem;
    margin: 0 2rem 2rem 0;
    font-size: 1.25rem;
  }
`;

const Results = styled.p`
  color: var(--bs-gray-700);
  margin: 1rem 0 2.5rem;
  font-size: 1rem;

  @media ${media.md} {
    font-size: 1.25rem;
  }
`;
