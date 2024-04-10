import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return params.userId;
};

export default function Layout() {
  const userId = useLoaderData<typeof loader>();
  return (
    <>
      <div className="h-10 w-full bg-slate-400">
        <span className="text-base-dark">Hello! {userId}</span>
      </div>
      <Outlet />
    </>
  );
}
