import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { authenticator } from '~/server/auth.server';
import { ErrorMessage } from '~/components/login/ErrorMessage';
import { AuthInput } from '~/components/login/AuthInput';
import { createUserSession } from '~/server/session.server';
import { AUTHENTICATOR_STRATEGY_NAME } from '~/constants/Authentication';
// import { SuccessMessage } from '~/components/login/SuccessMessage';

export const action = async ({ request }: ActionFunctionArgs) => {
  //   TODO: Change for sign up method
  const response = await authenticator.authenticate(
    AUTHENTICATOR_STRATEGY_NAME,
    request
  );
  if (response.user) {
    const userId = response.user.id;
    return createUserSession(userId, '/');
  } else {
    return json({ message: response.message }, { status: 400 });
  }
};

export default function SignUp() {
  const actionResponse = useActionData<typeof action>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="mx-auto mt-10 h-1/2 w-3/4 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-4">
        <span className="text-2xl">Sign Up</span>
        <Form method="post">
          <div className="flex flex-col mt-12 gap-y-6">
            {actionResponse?.message && <ErrorMessage />}
            {/* {actionResponse?.message && <SuccessMessage />} */}
            <AuthInput
              label="Email"
              name="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
            <AuthInput
              label="Password"
              name="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
            />
            <button
              type="submit"
              className="h-10 w-60 bg-base-dark text-white rounded-md text-lg mt-4">
              Sign Up
            </button>
          </div>
        </Form>
        <div className="flex flex-col items-start justify-center w-60 gap-y-1 mt-10">
          <button className="text-sm text-bright-purple">
            Login with your Account
          </button>
        </div>
      </div>
    </div>
  );
}
