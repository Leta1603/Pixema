import { KeyboardEvent, ReactElement } from "react";

export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
}

export enum TabsType {
  Rating = "rating",
  Year = "year",
}

export type ButtonProps = {
  type: ButtonTypes;
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

export type TitleProps = {
  title: string;
};

export type TabProps = {
  title: string;
  onClick: () => void;
  active?: boolean;
};

export type Tab = {
  key: TabsType;
  title: string;
};

export type TabsListType = Tab[];

export type TabsListProps = {
  tabsList: TabsListType;
  activeTab: TabsType;
  onClick: (tab: TabsType) => () => void;
};

export type InputProps = {
  title?: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  isTextArea?: boolean;
  errorText?: string;
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;
};

export type OptionType = { value: string; label: string };
export type OptionsType = OptionType[];

export type SelectProps = {
  title: string;
  placeholder: string;
  options: OptionsType;
  components: any;
  value: string[] | string;
  onChange: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
};

export type Children = ReactElement | ReactElement[];

export type LinksProps = {
  title: string;
  children: Children;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export type GenreType = {
  name: string;
  display_name: string;
};

export type CardProps = {
  title: string;
  image: string;
  genres: GenreType[];
  rating: number;
  isFavourite?: boolean;
  isTrend?: boolean;
};
