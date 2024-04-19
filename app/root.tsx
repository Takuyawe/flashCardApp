import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import 'remixicon/fonts/remixicon.css';
import stylesheet from '~/tailwind.css?url';
import { Header } from './components/Header';
import { requireUserSession } from './auth.server';
import { redirect } from 'remix-typedjson';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const userId = await requireUserSession(request);

  if (!userId) {
    if (url.pathname !== '/login') return redirect('/login');
  } else {
    if (url.pathname !== `/users/${userId}`)
      return redirect(`/users/${userId}`);
  }
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  // const loaderResponse = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* TODO: should h-dvh */}
      <body className="h-screen">
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
  return <Outlet />;
}
