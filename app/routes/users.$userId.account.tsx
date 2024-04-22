import { Outlet } from '@remix-run/react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~/atoms/atom';
import { CustomAccountLink } from '~/components/account/CustomAccountLink';

export default function Layout() {
  const [user, _] = useRecoilState(userAtom);

  return (
    <div className="h-body bg-base-dark border-t">
      <div className="h-full flex flex-col items-center">
        <span className="flex items-end justify-start pl-6 pb-2 h-24 w-full text-3xl text-white border-b">
          {user?.name}&apos;s Account
        </span>
        <div className="flex h-1/2 items-start w-full mt-5 divide-x-2">
          <div className="flex flex-col w-1/4 gap-y-4">
            <CustomAccountLink
              to={`/users/${user?.id}/account/home`}
              text="Account"
            />
            <CustomAccountLink
              to={`/users/${user?.id}/account/settings`}
              text="Settings"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
