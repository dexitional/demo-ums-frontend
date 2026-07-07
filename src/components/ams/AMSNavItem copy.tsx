import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  url?: string;
  Icon: IconType;
  isActive?: boolean;
};

function AMSNavItem({ title, url = "/", Icon }: Props) {
  return (
    <NavLink
      to={url}
      className={({ isActive, isPending, isTransitioning }) =>
        isActive
          ? `px-4 py-2 flex items-center space-x-2 bg-primary/90 rounded-lg`
          : isPending
          ? `px-4 py-2 flex items-center space-x-2 bg-primary-accent/90 rounded-lg [&]:text-red-600`
          : `px-4 py-2 flex items-center space-x-2 hover:bg-primary/90 hover:rounded-lg group`
      }
      children={({ isActive, isPending }) => {
        return (
          <>
            <Icon
              className={
                isActive
                  ? `p-1 h-5 w-5 bg-white rounded`
                  : isPending
                  ? `p-1 h-5 w-5 bg-white rounded-full text-primary line-clamp-1 animate-spin`
                  : `h-4 w-4 group-hover:p-1 group-hover:h-5 group-hover:w-5 group-hover:bg-white group-hover:rounded`
              }
            />
            <span
              className={
                isActive
                  ? `text-white line-clamp-1 font-semibold`
                  : isPending
                  ? `text-primary line-clamp-1 font-semibold animate-pulse`
                  : `text-gray-500 line-clamp-1 group-hover:text-white`
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

export default AMSNavItem;
