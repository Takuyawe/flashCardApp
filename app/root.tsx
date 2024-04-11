import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
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
