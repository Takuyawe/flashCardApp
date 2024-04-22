import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { typedjson } from 'remix-typedjson';
import { categoriesAtom, userAtom } from '~/atoms/atom';
import { BottomMenuBar } from '~/components/BottomMenuBar';
import { fetchCategories, getUserDataWithId } from '~/modules/prisma';
import { UserAtom } from '~/types/atom';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  if (!userId) return json({ user: null, categories: [] });
  const user = await getUserDataWithId(userId);
  if (!user) return json({ user: null });
  const userWithNameAndEmail: UserAtom = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const categories = await fetchCategories(userId);
  return typedjson({ user: userWithNameAndEmail, categories });
};

export default function Layout() {
  const loginResponse = useLoaderData<typeof loader>();
  const [, setUser] = useRecoilState(userAtom);
  const [, setCategories] = useRecoilState(categoriesAtom);

  useEffect(() => {
    if (!loginResponse.user) return;

    setUser(loginResponse.user);
    setCategories(loginResponse.categories);
  }, [loginResponse, setUser, setCategories]);

  return (
    <>
      <Outlet />
      <footer className="w-full fixed bottom-0 left-0">
        <BottomMenuBar />
      </footer>
    </>
  );
}
