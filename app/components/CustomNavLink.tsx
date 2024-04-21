import { NavLink } from "@remix-run/react";

type Props = {
  to: string;
  icon: string;
  text: string;
};

export const CustomNavLink = ({ to, icon, text }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `flex-1 ${isActive ? "bg-gray-600" : ""}`}
    >
      <div className="flex flex-col justify-center items-center">
        <i className={`text-white ${icon} text-2xl`} />
        <span className="text-white text-xs">{text}</span>
      </div>
    </NavLink>
  );
};
