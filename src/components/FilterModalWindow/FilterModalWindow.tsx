import React, { Fragment, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSelectors,
  setFilterModalOpened,
} from "src/redux/reducers/postSlice";
import { useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import { GenreSelectors } from "src/redux/reducers/genreSlice";
import { getRegions, RegionSelectors } from "src/redux/reducers/regionSlice";
import {
  ButtonTypes,
  OptionsType,
  queryParamsType,
  TabsType,
  Theme,
} from "src/@types";
import styles from "./FilterModalWindow.module.scss";
import TabsList from "src/components/TabsList";
import Input from "src/components/Input";
import SelectComponent from "src/components/SelectComponent";
import Button from "src/components/Button";
import { CloseIcon } from "src/assets/icons";
import { useThemeContext } from "src/context/Theme";
import classNames from "classnames";

const FilterModalWindow = () => {
  const isOpened = useSelector(PostSelectors.getFilterMovieOpened);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { themeValue } = useThemeContext();

  // const [inputValue, setInputValue] = useState("");
  const [yearFromValue, setYearFromValue] = useState("");
  const [yearToValue, setYearToValue] = useState("");
  const [ratingFromValue, setRatingFromValue] = useState("");
  const [ratingToValue, setRatingToValue] = useState("");
  const [selectValue, setSelectValue] = useState([""]);
  const [regionValue, setRegionValue] = useState("");
  const [activeTab, setActiveTab] = useState(TabsType.Rating);
  const [validationErrors, setValidationErrors] = useState({
    yearFrom: "",
    yearTo: "",
    ratingFrom: "",
    ratingTo: "",
  });

  const animatedComponents = makeAnimated();
  const genres = useSelector(GenreSelectors.getGenres);

  const regions = useSelector(RegionSelectors.getRegions);

  const options: OptionsType = genres.map(({ id, name }) => {
    return { value: `${id}`, label: name };
  });

  const regionsOptions: OptionsType = regions.map(
    ({ iso_3166_1, english_name }) => {
      return { value: iso_3166_1, label: english_name };
    },
  );

  const tabsList = [
    { key: TabsType.Rating, title: "Rating" },
    { key: TabsType.Year, title: "Year" },
  ];

  const onTabClick = (tab: TabsType) => () => {
    setActiveTab(tab);
  };

  const onClearFilterClick = () => {
    // setInputValue("");
    setYearFromValue("");
    setYearToValue("");
    setRatingFromValue("");
    setRatingToValue("");
    setSelectValue([""]);
    setYearToValue("");
    setRegionValue("");
    setActiveTab(TabsType.Rating);
  };

  const onCloseModal = () => {
    dispatch(setFilterModalOpened(false));
    onClearFilterClick();
  };

  useEffect(() => {
    dispatch(getRegions());
  }, []);

  useEffect(() => {
    // Проверка валидации
    const yearFromError = !/^\d*$/.test(yearFromValue) && yearFromValue !== "";
    const yearToError = !/^\d*$/.test(yearToValue) && yearToValue !== "";
    const ratingFromError =
      !/^\d*(\.\d+)?$/.test(ratingFromValue) && ratingFromValue !== "";
    const ratingToError =
      !/^\d*(\.\d+)?$/.test(ratingToValue) && ratingToValue !== "";

    setValidationErrors({
      yearFrom: yearFromError ? "Enter an integer" : "",
      yearTo: yearToError ? "Enter an integer" : "",
      ratingFrom: ratingFromError ? "Enter a fractional or integer number" : "",
      ratingTo: ratingToError ? "Enter a fractional or integer number" : "",
    });
  }, [yearFromValue, yearToValue, ratingFromValue, ratingToValue]);

  const onShowResultsClick = () => {
    // Если есть ошибки валидации, не отправляем запрос
    if (
      validationErrors.yearFrom ||
      validationErrors.yearTo ||
      validationErrors.ratingFrom ||
      validationErrors.ratingTo
    ) {
      return;
    }

    const selectValueString = selectValue.reduce((prev, curr, index) => {
      if (index === 0) {
        return `${curr}`;
      } else {
        return `${prev}|${curr}`;
      }
    }, "");

    const queryParams: queryParamsType = {
      sort_by: activeTab,
      with_genres: selectValueString,
      region: regionValue,
      release_date_from: yearFromValue ? `${yearFromValue}-01-01` : "",
      release_date_to: yearToValue ? `${yearToValue}-01-01` : "",
      vote_average_from: ratingFromValue,
      vote_average_to: ratingToValue,
    };

    const objectToQueryString = (params: {
      [key: string]: string | number | boolean;
    }): string => {
      return Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join("&");
    };

    const queryString = objectToQueryString(queryParams);

    dispatch(setFilterModalOpened(false));
    onClearFilterClick();

    navigate(`/filter/${queryString}`);
  };

  return (
    <Fragment>
      <Modal open={isOpened} onClose={onCloseModal}>
        <div
          className={classNames(styles.filterContent, {
            [styles.lightFilterContainer]: themeValue === Theme.Light,
          })}
        >
          <div className={styles.filterHeader}>
            <div className={styles.filterTitle}>Filters</div>
            <div onClick={onCloseModal} className={styles.closeModal}>
              <CloseIcon />
            </div>
          </div>
          <div
              className={classNames(styles.filterItem, {
                [styles.lightFilterItem]: themeValue === Theme.Light,
              })}
          >
            <TabsList
              tabsList={tabsList}
              activeTab={activeTab}
              onClick={onTabClick}
            />
          </div>
          {/*<div className={styles.filterItem}>*/}
          {/*  <Input*/}
          {/*    title={"Keywords"}*/}
          {/*    placeholder={"Enter the keywords separated by ,"}*/}
          {/*    onChange={setInputValue}*/}
          {/*    value={inputValue}*/}
          {/*  />*/}
          {/*</div>*/}
          <div
              className={classNames(styles.filterItem, {
                [styles.lightFilterItem]: themeValue === Theme.Light,
              })}
          >
            <SelectComponent
              title={"Genre"}
              placeholder={"Choose genres"}
              options={options}
              components={animatedComponents}
              value={selectValue}
              onChange={setSelectValue}
              isMulti
            />
          </div>
          <div
              className={classNames(styles.filterItem, {
                [styles.lightFilterItem]: themeValue === Theme.Light,
              })}
          >
            <SelectComponent
              title={"Country"}
              placeholder={"Select country"}
              options={regionsOptions}
              components={animatedComponents}
              value={regionValue}
              onChange={setRegionValue}
            />
          </div>
          <div
            className={classNames(styles.filterItem, {
              [styles.lightFilterItem]: themeValue === Theme.Light,
            })}
          >
            <div>Years</div>
            <div className={styles.filterYears}>
              <Input
                placeholder={"From"}
                onChange={setYearFromValue}
                value={yearFromValue}
                errorText={yearFromValue && validationErrors.yearFrom}
              />
              <Input
                placeholder={"To"}
                onChange={setYearToValue}
                value={yearToValue}
                errorText={yearToValue && validationErrors.yearTo}
              />
            </div>
          </div>
          <div
              className={classNames(styles.filterItem, {
                [styles.lightFilterItem]: themeValue === Theme.Light,
              })}
          >
            <div>Rating</div>
            <div className={styles.filterYears}>
              <Input
                placeholder={"From"}
                onChange={setRatingFromValue}
                value={ratingFromValue}
                errorText={ratingFromValue && validationErrors.ratingFrom}
              />
              <Input
                placeholder={"To"}
                onChange={setRatingToValue}
                value={ratingToValue}
                errorText={ratingToValue && validationErrors.ratingTo}
              />
            </div>
          </div>
          <div className={styles.filterBtns}>
            <Button
              type={ButtonTypes.Secondary}
              title={"Clear filter"}
              onClick={onClearFilterClick}
            />
            <Button
              type={ButtonTypes.Primary}
              title={"Show results"}
              onClick={onShowResultsClick}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default FilterModalWindow;
