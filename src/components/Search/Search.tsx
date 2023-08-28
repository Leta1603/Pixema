import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Input from "../Input";
import { FilterIcon } from "src/assets/icons";

import styles from "./Search.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { TOTAL_POSTS_COUNT, URL_IMG } from "src/utils/constants";
import Loader from "src/components/Loader";
import {
  clearSearchedPosts,
  getSearchedPosts,
  PostSelectors,
  setFilterModalOpened,
} from "src/redux/reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

type Search = {
  disabled?: boolean;
  className?: string;
};
const Search: FC<Search> = ({ disabled, className }) => {
  const dispatch = useDispatch();

  const { themeValue } = useThemeContext();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpened, setDropdownOpened] = useState(false);

  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputValue.length) {
      dispatch(
        getSearchedPosts({
          page: currentPage,
          query: inputValue,
          isOverwrite: true,
        }),
      );
      setDropdownOpened(true);
    } else {
      dispatch(clearSearchedPosts());
      setDropdownOpened(false);
    }
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchOpened = () => {
    if (inputValue) {
      dispatch(clearSearchedPosts());
      navigate(`movies/${inputValue}`);
      setInputValue("");
    }
  };
  const onKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearchOpened();
    }
  };
  const onClickDropdownItem = (id: number) => () => {
    setDropdownOpened(false);
    navigate(`/movie/${id}`);
    setInputValue("");
  };
  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setDropdownOpened(false);
    }
  };

  const onFilterClick = () => {
    dispatch(setFilterModalOpened(true));
  };

  return (
    <>
      <div
        className={classNames(
          styles.container,
          {
            [styles.disabled]: disabled,
            [styles.lightContainer]: themeValue === Theme.Light,
          },
          className,
        )}
      >
        <Input
          className={styles.searchInput}
          placeholder={"Search"}
          onChange={setInputValue}
          value={inputValue}
          onKeyDown={onKeyDown}
        />
        <div
          className={classNames(styles.icon, {
            [styles.lightIcon]: themeValue === Theme.Light,
          })}
          onClick={onFilterClick}
        >
          {disabled ? <FilterIcon fill={"#AFB2B6"} /> : <FilterIcon />}
        </div>
      </div>
      {!!searchedPosts.length && isDropdownOpened && (
        <div
          className={classNames(styles.dropdown, {
            [styles.lightDropdown]: themeValue === Theme.Light,
          })}
          ref={divRef}
        >
          <InfiniteScroll
            next={onNextReached}
            scrollThreshold={0.7}
            hasMore={searchedPosts.length < TOTAL_POSTS_COUNT}
            loader={<Loader />}
            dataLength={searchedPosts.length}
            scrollableTarget="scrollableDiv"
          >
            {searchedPosts.map(
              ({ id, title, poster_path, vote_average, overview }) => {
                return (
                  <div
                    key={id}
                    onClick={onClickDropdownItem(id)}
                    className={styles.dropdownContainer}
                  >
                    <div className={styles.dropdownImg}>
                      <img src={`${URL_IMG}${poster_path}`} alt="poster" />
                    </div>
                    <div className={styles.titleAndDesc}>
                      <div className={styles.dropdownTitle}>{title}</div>
                      <div
                        className={classNames(styles.desc, {
                          [styles.lightDesc]: themeValue === Theme.Light,
                        })}
                      >
                        {overview}
                      </div>
                    </div>
                    <div
                      className={classNames(styles.dropdownRating, {
                        [styles.yellow]:
                          vote_average >= 5.5 && vote_average <= 7.4,
                        [styles.orange]:
                          vote_average >= 0 && vote_average < 5.5,
                      })}
                    >
                      {vote_average.toFixed(1)}
                    </div>
                  </div>
                );
              },
            )}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Search;
