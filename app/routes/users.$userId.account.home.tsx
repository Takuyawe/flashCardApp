import { Form } from '@remix-run/react';

export default function Index() {
  return (
    <div className="flex flex-col justify-between border h-20 px-3">
      <span className="text-white text-md pt-1">
        Sign out from your account
      </span>
      <Form method="post" action="signout" className="ml-auto  mb-2">
        <button className="bg-white h-5 w-20 text-sm rounded-md">
          Sign Out
        </button>
      </Form>
    </div>
  );
}
