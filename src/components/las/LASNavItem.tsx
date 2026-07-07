import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  url?: string;
  Icon: IconType;
  isActive?: boolean;
};

function LASNavItem({ title, url = "/", Icon }: Props) {
  return (
    <NavLink
      to={url}
      className={({ isActive, isPending }) =>
        isActive
          ? `px-4 py-3 flex items-center space-x-4 bg-blue-950/70 rounded-lg`
          : `px-4 py-3 flex items-center space-x-4`
      }
      children={({ isActive }) => {
        return (
          <>
            <Icon
              className={isActive ? `p-1 h-5 w-5 bg-white rounded` : `h-4 w-4`}
            />
            <span className={isActive ? `text-white` : `text-gray-500`}>
              {title}
            </span>
          </>
        );
      }}
    />
  );
}

export default LASNavItem;
