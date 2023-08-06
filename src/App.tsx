import React, { useState } from "react";
import makeAnimated from "react-select/animated";

import Button from "./components/Button";
import { TabsType } from "./@types";
import Title from "./components/Title";

import styles from "./App.module.scss";
import TabsList from "./components/TabsList";
import Input from "./components/Input";
import SelectComponent from "./components/SelectComponent";

import Search from "./components/Search";
import SwitchComponent from "./components/SwitchComponent";
import Username from "./components/Username";
import Links from "./components/Links";
import { HomeIcon, FavoritesIcon, ShareIcon } from "./assets/icons";
import Card from "./components/Card";
import CardsList from "./components/CardsList";
import Header from "./components/Header";

const App = () => {
  const [activeTab, setActiveTab] = useState(TabsType.Rating);

  // delete
  const tabsList = [
    { key: TabsType.Rating, title: "Rating" },
    { key: TabsType.Year, title: "Year" },
  ];

  const onTabClick = (tab: TabsType) => () => {
    setActiveTab(tab);
  };

  const [input, setInput] = useState("");

  // delete
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // delete
  const buttonGroupList = [
    {
      icon: <FavoritesIcon />,
      onClick: () => console.log("fav"),
    },
    {
      icon: <ShareIcon />,
      onClick: () => console.log("share"),
    },
  ];

  const animatedComponents = makeAnimated();
  const [select, setSelect] = useState("");

  return (
    <div className={styles.container}>
      <Header />
      {/*<Title title={"Sign In"} />*/}
      {/*<TabsList*/}
      {/*  tabsList={tabsList}*/}
      {/*  activeTab={activeTab}*/}
      {/*  onClick={onTabClick}*/}
      {/*/>*/}
      {/*<Button type={ButtonTypes.Primary} title={"Primary"} onClick={() => {}} />*/}
      {/*<Button*/}
      {/*  type={ButtonTypes.Secondary}*/}
      {/*  title={"Secondary"}*/}
      {/*  onClick={() => {}}*/}
      {/*/>*/}
      {/*<Input*/}
      {/*  title={"Title"}*/}
      {/*  placeholder={"Placeholder"}*/}
      {/*  onChange={setInput}*/}
      {/*  value={input}*/}
      {/*  // disabled*/}
      {/*/>*/}
      {/*<SelectComponent*/}
      {/*  title={"Title"}*/}
      {/*  placeholder={"Placeholder"}*/}
      {/*  value={select}*/}
      {/*  onChange={setSelect}*/}
      {/*  components={animatedComponents}*/}
      {/*  options={options}*/}
      {/*  // isMulti*/}
      {/*/>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<Search />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<SwitchComponent />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<Username username={"Violetta Zarubayko"} />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<Links title={"Home"} onClick={() => {}} disabled>*/}
      {/*  <HomeIcon />*/}
      {/*</Links>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*/!*  buttonGroups *!/*/}
      {/*<div>*/}
      {/*  {buttonGroupList.map(({ icon, onClick }, index) => {*/}
      {/*    return (*/}
      {/*      <div key={index} onClick={onClick}>*/}
      {/*        {icon}*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<Card*/}
      {/*  title={"Harry Potter and the Deathly Hallows: Part 2"}*/}
      {/*  image={*/}
      {/*    "https://www.hdclub.ua/files/film_poster/big/bigi4f953325d4c9d.jpg"*/}
      {/*  }*/}
      {/*  genres={[*/}
      {/*    {*/}
      {/*      name: "action",*/}
      {/*      display_name: "Adventure",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      name: "action",*/}
      {/*      display_name: "Action",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      name: "action",*/}
      {/*      display_name: "Fantasy",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      name: "action",*/}
      {/*      display_name: "Action",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      name: "action",*/}
      {/*      display_name: "Fantasy",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  rating={7.3}*/}
      {/*  // isTrend*/}
      {/*/>*/}
      {/*<br />*/}
    </div>
  );
};

export default App;
