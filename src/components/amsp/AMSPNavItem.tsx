import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  url?: string;
  Icon: IconType;
  isActive?: boolean;
};

function AMSPNavItem({ title, url = "/", Icon }: Props) {
  return (
    <NavLink
      to={url}
      className={({ isActive, isPending }) =>
        isActive
          ? `md:ml-6 px-10 md:px-4 py-1 flex items-center space-x-2 bg-white shadow-xl rounded-l-3xl rounded-r ring-1 ring-offset-8 ring-primary/50`
          : `ml-6 px-4 py-2 flex items-center space-x-2`
      }
      children={({ isActive }) => {
        return (
          <>
            <Icon
              className={
                isActive
                  ? `h-5 w-5 rounded text-primary-accent/70 `
                  : `h-5 w-5 text-white`
              }
            />
            <span
              className={
                isActive
                  ? `text-primary/90 font-semibold`
                  : `text-white font-light`
              }
            >
              {title}
            </span>
          </>
        );
      }}
    />
  );
}

export default AMSPNavItem;
