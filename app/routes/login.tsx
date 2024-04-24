import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { login } from '~/server/login.server';
import { ErrorMessage } from '~/components/auth/ErrorMessage';
import { AuthInput } from '~/components/auth/AuthInput';
import { createUserSession } from '~/server/session.server';
import { loginSchema } from '~/zodSchema';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { getFormProps, SubmissionResult, useForm } from '@conform-to/react';
import { FAILED_TO_LOGIN } from '~/constants/Authentication';
// import { SuccessMessage } from '~/components/login/SuccessMessage';

type ActionResponse = {
  message: string;
  submission?: SubmissionResult;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== 'success') {
    return json<ActionResponse>({
      message: FAILED_TO_LOGIN,
      submission: submission.reply(),
    });
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await login(email, password);

  if (response.success && response.data) {
    const userId = response.data.id;
    return createUserSession(userId, '/');
  } else {
    if (response.message)
      return json<ActionResponse>(
        { message: response.message },
        { status: 400 }
      );
  }
};

export default function Login() {
  const actionResponse = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult: actionResponse?.submission,
    constraint: getZodConstraint(loginSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  console.log(fields.password.errors);

  return (
    <div className="mx-auto mt-10 h-auto min-h-2/3 w-3/4 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-4">
        <span className="text-2xl">Sign In</span>
        <Form method="post" {...getFormProps(form)}>
          <div className="flex flex-col mt-12 gap-y-6">
            {actionResponse?.message && (
              <ErrorMessage errorMessage={actionResponse.message} />
            )}
            {/* {actionResponse?.message && <SuccessMessage />} */}
            <AuthInput
              label="Email"
              name="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={fields.email.errors && fields.email.errors[0]}
            />
            <AuthInput
              label="Password"
              name="password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={fields.password.errors && fields.password.errors[0]}
            />
            <button
              type="submit"
              className="h-10 w-60 bg-base-dark text-white rounded-md text-lg mt-4">
              Sign In
            </button>
          </div>
        </Form>
        <div className="flex flex-col items-start justify-center w-60 gap-y-2 mt-10">
          <Link to="/signup" className="text-sm text-bright-purple">
            Create an Account
          </Link>
          <button className="text-sm text-bright-purple">
            Forgot your Password?
          </button>
        </div>
      </div>
    </div>
  );
}
