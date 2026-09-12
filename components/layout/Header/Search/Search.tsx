import "animate.css/animate.min.css";
import { debounce } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import media from "styles/media";

import CrossIcon from "components/icons/CrossIcon";

import { LoadingAnimation } from "./LoadingAnimation";
import { Pagination } from "./Pagination";
import { SearchResult } from "./SearchResult";

import { SearchResultData, SearchResultsData } from "types/content";

interface FilterButtonProps {
  children: React.ReactNode;
  id: string;
  model: string;
  setModel: (arg: string) => void;
}

const FilterButton = ({ children, id, model, setModel }: FilterButtonProps) => (
  <FilterButtonElem
    className={`${model === id ? "selected" : ""}`}
    onClick={() => setModel(id)}
  >
    {children}
  </FilterButtonElem>
);

interface SearchProps {
  setShowSearch: (show: boolean) => void;
}

export const Search = ({ setShowSearch }: SearchProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState<SearchResultsData>();
  const [searchResults, setSearchResults] = useState<SearchResultData[]>();
  const [model, setModel] = useState("All");

  const filters = searchData?.query;

  const search = async (query: string, model?: string, page?: number) => {
    const res = await fetch(
      `/api/search?q=${query}&model=${model}&page=${page || 1}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );
    const json = await res.json();
    return json.data;
  };

  const debouncedSearch = useRef(
    debounce(async (query, model, page) => {
      const hasQuery = query !== "";
      const searchData = hasQuery
        ? await search(query, model, page)
        : undefined;
      setSearchData(searchData);
      setSearchResults(hasQuery ? searchData.data : []);
      setIsLoading(false);
    }, 800)
  ).current;

  const handleClearButtonClick = async () => {
    setInputValue("");
    setQuery("");
    searchInputRef?.current?.focus();
  };

  // Handle input change
  useEffect(() => {
    setIsLoading(true);
    const input = encodeURIComponent(inputValue);
    setQuery(input);
    debouncedSearch(input, model === "All" ? "" : model, 1);
  }, [inputValue, model, debouncedSearch]);

  // Cancel debounce function on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // Focus search input on load
  useEffect(() => {
    searchInputRef?.current?.focus();
  }, []);

  return (
    <Root className="position-fixed top-0 bottom-0 start-0 end-0 animate__animated animate__fadeIn animate__faster">
      <SearchHeader className="container-fluid pt-4 pt-md-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-center align-items-center">
                <div className="flex-grow-1">
                  <Logo>
                    <Image
                      src={"/images/logo-white.svg"}
                      alt="Thanos Realty | Halving Occupancy, Doubling Space"
                      layout="fill"
                      objectFit="contain"
                      objectPosition={"left center"}
                    />
                  </Logo>
                </div>
                <div className="d-flex align-items-center ps-3 pe-2">
                  <CloseButton onClick={() => setShowSearch(false)}>
                    <CrossIcon />
                  </CloseButton>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9 col-xxl-8 pt-5 pt-md-6 pb-2 pb-md-5">
              <SearchField>
                <SearchInput
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={(keyboardEvent) => {
                    const key = keyboardEvent.code || keyboardEvent.keyCode;
                    if (key === "Enter" || key === 13) {
                      searchInputRef?.current?.blur();
                    }
                  }}
                />
                <div className="d-flex align-items-center position-absolute top-0 bottom-0 end-0">
                  <SearchButton type="button" onClick={handleClearButtonClick}>
                    {inputValue === "" ? (
                      <Image
                        src="/images/icon-search.svg"
                        alt="Search"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <Image
                        src="/images/icon-cross.svg"
                        alt="Clear"
                        width={22}
                        height={22}
                      />
                    )}
                  </SearchButton>
                </div>
              </SearchField>
              {inputValue && filters && (
                <div className="d-flex flex-column flex-sm-row mt-4">
                  <FilterByText className="flex-shrink-0 mb-0 me-3 pb-2">
                    Filter by:
                  </FilterByText>
                  <div className="d-flex flex-wrap">
                    <FilterButton id="All" model={model} setModel={setModel}>
                      All results ({filters.total})
                    </FilterButton>
                    <FilterButton
                      id="CaseStory"
                      model={model}
                      setModel={setModel}
                    >
                      Case stories ({filters.case_stories})
                    </FilterButton>
                    <FilterButton id="Post" model={model} setModel={setModel}>
                      Articles ({filters.posts})
                    </FilterButton>
                    <FilterButton
                      id="Property"
                      model={model}
                      setModel={setModel}
                    >
                      Properties ({filters.properties})
                    </FilterButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SearchHeader>
      {inputValue && inputValue !== "" && (
        <SearchResults
          className={`container-fluid py-4 py-md-5 animate__animated animate__fadeInUp animate__fast`}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9 col-xxl-8">
                {searchResults && searchResults.length > 0 ? (
                  <>
                    <Results>
                      Showing{" "}
                      <span className="fw-bold">
                        {searchData?.from || 1}-{searchData?.to || 1}
                      </span>{" "}
                      of{" "}
                      <span className="fw-bold">{searchData?.total || 0}</span>{" "}
                      results
                    </Results>
                    {searchResults.map((result, i) => {
                      return (
                        <SearchResult
                          key={result.id}
                          data={result}
                          index={i}
                          onResultClicked={() => setShowSearch(false)}
                        />
                      );
                    })}
                    {searchData &&
                      searchData.last_page &&
                      searchData.last_page > 1 && (
                        <div className="py-5">
                          <Pagination
                            current_page={searchData?.current_page || 1}
                            last_page={searchData?.last_page || 1}
                            scrollTarget={"searchHeader"}
                            getData={(page) => {
                              setIsLoading(true);
                              setSearchData(undefined);
                              setSearchResults([]);
                              debouncedSearch(query, model, page);
                            }}
                          />
                        </div>
                      )}
                  </>
                ) : (
                  <h5 className="text-center mt-5">
                    {isLoading ? <LoadingAnimation /> : "No results found."}
                  </h5>
                )}
              </div>
            </div>
          </div>
        </SearchResults>
      )}
    </Root>
  );
};

const Root = styled.div`
  background: var(--bs-gray-1000);
  overflow-y: auto;
`;

const SearchHeader = styled.section`
  background: var(--bs-gray-1000);
  color: var(--bs-white);
`;

const Logo = styled.div`
  width: 100%;
  height: 35px;
  position: relative;

  @media ${media.md} {
    height: 48px;
  }
`;

const CloseButton = styled.button`
  color: var(--bs-white);
  background: transparent;
  border: none;
  padding: 0.5rem;
  margin: 0;
  width: 2.5rem;
  opacity: 1;

  &:hover,
  &:focus {
    opacity: 0.6;
    transition: 0.3s opacity;
  }
`;

const SearchField = styled.div`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  background: transparent;
  color: var(--bs-white);
  border: none;
  border-bottom: 2px solid var(--bs-gray-700);
  width: 100%;
  padding: 1rem 2.5rem 1rem 0;
  margin: 0;
  font-family: "linux_libertine", serif;
  font-size: 1.5rem;
  transition: 0.3s border-color;

  &:focus {
    border-bottom: 2px solid var(--bs-white);
    transition: 0.3s border-color;
    outline: none;
  }

  @media ${media.sm} {
    padding: 1rem 4.5rem 1rem 0;
    font-size: 2rem;
  }
`;

const SearchButton = styled.button`
  background: transparent;
  color: var(--bs-white);
  border: none;
  padding: 0.125rem;
  margin: 0;
  display: flex;

  @media ${media.sm} {
    padding: 0.5rem;
  }

  @media ${media.md} {
    padding: 1rem;
  }
`;

const FilterByText = styled.p`
  padding: 0 0 0.25rem;
  font-size: 1rem;
  line-height: 2;

  @media ${media.md} {
    padding: 0.5rem 0;
    font-size: 1.25rem;
  }
`;

const FilterButtonElem = styled.button`
  background: transparent;
  border: none;
  padding: 0 0 0.25rem;
  margin: 0 1rem 1rem;
  color: var(--bs-white);
  font-size: 1rem;
  line-height: 2;

  @media ${media.md} {
    padding: 0.5rem 0;
    font-size: 1.25rem;
  }

  &.selected {
    font-weight: bold;
    border-bottom: 1px solid var(--bs-white);
  }
`;

const SearchResults = styled.section`
  background: var(--bs-white);
  min-height: 80%;
`;

const Results = styled.p`
  color: var(--bs-gray-700);
  margin: 1rem 0;
  font-size: 1rem;

  @media ${media.md} {
    font-size: 1.25rem;
  }
`;
