import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '~/atoms/atom';
import { BottomMenuBar } from '~/components/BottomMenuBar';
import { getUserDataWithId } from '~/modules/prisma';
import { UserAtom } from '~/types/atom';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  const user = await getUserDataWithId(userId as string);
  if (!user) return json({ user: null });
  const userWithNameAndEmail: UserAtom = {
    name: user.name,
    email: user.email,
  };
  return json({ user: userWithNameAndEmail });
};

export default function Layout() {
  const loginResponse = useLoaderData<typeof loader>();
  const [_, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (!loginResponse.user) return;

    setUser(loginResponse.user);
  }, [loginResponse.user, setUser]);

  return (
    <>
      <Outlet />
      <footer className="w-full fixed bottom-0 left-0">
        <BottomMenuBar />
      </footer>
    </>
  );
}
