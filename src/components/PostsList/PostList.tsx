import React, { FC } from "react";
import Post from "../Post";
import styles from "./PostList.module.scss";
import { PostsList } from "src/@types";
import Loader from "src/components/Loader";

type PostsListProps = {
  postList: PostsList;
  isTrend?: boolean;
  isListLoading?: boolean;
};

const PostList: FC<PostsListProps> = ({ postList, isTrend, isListLoading }) => {
  return postList.length && !isListLoading ? (
    <div className={styles.postListContainer}>
      {postList.map((post, index) => {
        return <Post isTrend={isTrend} key={index} {...post} />;
      })}
    </div>
  ) : (
    <Loader />
  );
};

export default PostList;
