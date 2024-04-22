import { NavLink } from '@remix-run/react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~/atoms/atom';
import { getMenuPath } from '~/modules/path/getMenuPath';

type Props = {
  to: string;
  icon: string;
  text: string;
};

export const CustomNavLink = ({ to, icon, text }: Props) => {
  const [user] = useRecoilState(userAtom);

  return (
    <NavLink
      to={getMenuPath(user?.id as string, to)}
      className={({ isActive }) =>
        `flex-1 h-full flex flex-col justify-center ${
          isActive ? 'bg-gray-600' : ''
        }`
      }>
      <div className="flex flex-col justify-center items-center">
        <i className={`text-white ${icon} text-2xl`} />
        <span className="text-white text-xs">{text}</span>
      </div>
    </NavLink>
  );
};
