import React, { FC, useEffect, useState } from "react";

type PlayerProps = {
  title: string;
  year: number;
  id: number;
};

const Player: FC<PlayerProps> = ({ title, year, id }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//yohoho.cc/yo.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [title, year, id]);
  return <div id="yohoho" data-title={`${title} (${year})`}></div>;
};

export default Player;
