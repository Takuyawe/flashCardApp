import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { typedjson } from 'remix-typedjson';
import { categoriesAtom, userAtom, wordsAtom } from '~/atoms/atom';
import { BottomMenuBar } from '~/components/BottomMenuBar';
import { convertCategoryObjectToMap } from '~/modules/category/convertCategoryObjectToMap';
import {
  fetchWords,
  fetchCategories,
  getUserDataWithId,
} from '~/modules/prisma';
import { convertWordObjectToMap } from '~/modules/word/convertWordObjectToMap';
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
  const words = await fetchWords(userId);
  return typedjson({ user: userWithNameAndEmail, categories, words });
};

export default function Layout() {
  const { user, categories, words } = useLoaderData<typeof loader>();
  const [, setUser] = useRecoilState(userAtom);
  const [, setCategories] = useRecoilState(categoriesAtom);
  const [, setWords] = useRecoilState(wordsAtom);

  useEffect(() => {
    if (!user) return;

    setUser(user);
    setCategories(convertCategoryObjectToMap(categories));
    setWords(convertWordObjectToMap(words));
  }, [user, categories, words, setUser, setCategories, setWords]);

  return (
    <>
      <Outlet />
      <footer className="w-full fixed bottom-0 left-0">
        <BottomMenuBar />
      </footer>
    </>
  );
}
