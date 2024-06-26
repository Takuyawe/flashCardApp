import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import 'remixicon/fonts/remixicon.css';
import stylesheet from '~/globals.css?url';
import { Header } from './components/Header';
import { requireUserSession } from './server/auth.server';
import { redirect } from 'remix-typedjson';
import { RecoilRoot } from 'recoil';
import { getMenuPath } from './modules/path/getMenuPath';
import { ACCOUNT, BROWSE, QUIZ, WORD } from './constants/Path';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const userId = await requireUserSession(request);

  if (!userId) {
    if (url.pathname !== '/login' && url.pathname !== '/signup')
      return redirect('/login');
  } else {
    const wordPath = getMenuPath(userId, WORD);
    const quizPath = getMenuPath(userId, QUIZ);
    const browsePath = getMenuPath(userId, BROWSE);
    const accountPath = getMenuPath(userId, ACCOUNT);
    if (
      !url.pathname.includes(wordPath) &&
      !url.pathname.includes(quizPath) &&
      !url.pathname.includes(browsePath) &&
      !url.pathname.includes(accountPath)
    )
      return redirect(wordPath);
  }
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-dvh">
        <header>
          <Header />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <Outlet />
    </RecoilRoot>
  );
}
