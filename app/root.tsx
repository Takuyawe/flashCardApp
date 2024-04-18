import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import 'remixicon/fonts/remixicon.css';
import stylesheet from '~/tailwind.css?url';
import { BottomMenuBar } from './components/BottomMenuBar';
import { Header } from './components/Header';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

// TODO: add loader to check if user is logged in, if not redirect to login page

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = 'clv0qs04i00006d6c18akraw9';
  if (request.url === 'http://localhost:5173/')
    return redirect(`/users/${userId}`);
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
      {/* TODO: should h-dvh */}
      <body className="h-screen">
        <header>
          <Header />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <footer className="w-full fixed bottom-0 left-0">
          <BottomMenuBar />
        </footer>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
