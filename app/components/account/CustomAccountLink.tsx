import { NavLink } from '@remix-run/react';

type Props = {
  to: string;
  text: string;
};

export const CustomAccountLink = ({ to, text }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex-1 text-center py-2 rounded-sm ${isActive ? 'bg-gray-600' : ''}`
      }>
      <span className="text-white text-md">{text}</span>
    </NavLink>
  );
};
