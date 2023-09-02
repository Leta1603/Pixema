import { KeyboardEvent, ReactElement } from "react";
import { GenresData } from "src/redux/@type";

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
  className?: string;
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
  type?: string;
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


export interface iPost {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count?: number;

  genres?: GenresData[];
}

export type PostsList = iPost[];

export type queryParamsType = {
  sort_by: string;
  with_genres: string;
  region: string;
  release_date_from: string;
  release_date_to: string;
  vote_average_from: string;
  vote_average_to: string;
};

export enum Theme {
  Light = "light",
  Dark = "dark",
}
