import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { authenticator } from '~/auth.server';
import { LoginInput } from '~/components/login/LoginInput';

export const action = async ({ request }: ActionFunctionArgs) => {
  const response = await authenticator.authenticate('user-login', request);
  if (response.user) {
    return redirect(`/users/${response.user.id}`);
  } else {
    return json({ message: response.message }, { status: 400 });
  }
};

export default function Login() {
  const actionResponse = useActionData<typeof action>();
  console.log(actionResponse);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="mx-auto mt-10 h-1/2 w-3/4 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-2">
        <span className="text-2xl">Sign In</span>
        <Form method="post">
          <div className="flex flex-col mt-12 gap-y-6">
            <LoginInput
              label="Email"
              name="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
            <LoginInput
              label="Password"
              name="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
            />
            <button
              type="submit"
              className="h-10 w-60 bg-base-dark text-white rounded-md text-lg mt-4">
              Sign In
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
