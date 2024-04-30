import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { signup } from '~/server/signup.server';
import { ErrorMessage } from '~/components/auth/ErrorMessage';
import { AuthInput } from '~/components/auth/AuthInput';
import { createUserSession } from '~/server/session.server';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { signupSchema } from '~/zodSchema/auth';
import { getFormProps, SubmissionResult, useForm } from '@conform-to/react';
import { FAILED_TO_SIGNUP } from '~/constants/Authentication';
// import { SuccessMessage } from '~/components/login/SuccessMessage';

type ActionResponse = {
  message: string;
  submission?: SubmissionResult;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== 'success') {
    return json<ActionResponse>({
      message: FAILED_TO_SIGNUP,
      submission: submission.reply(),
    });
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await signup(name, email, password);

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

export default function SignUp() {
  const actionResponse = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult: actionResponse?.submission,
    constraint: getZodConstraint(signupSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="mx-auto mt-10 h-auto min-h-2/3 w-3/4 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-4">
        <span className="text-2xl">Sign Up</span>
        <Form method="post" {...getFormProps(form)}>
          <div className="flex flex-col mt-12 gap-y-6">
            {actionResponse?.message && (
              <ErrorMessage errorMessage={actionResponse.message} />
            )}
            {/* {actionResponse?.message && <SuccessMessage />} */}
            <AuthInput
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              setValue={setName}
              error={fields.name.errors && fields.name.errors[0]}
            />
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
              Sign Up
            </button>
          </div>
        </Form>
        <div className="flex flex-col items-start justify-center w-60 gap-y-1 mt-10">
          <Link to="/login" className="text-sm text-bright-purple">
            Login with your Account
          </Link>
        </div>
      </div>
    </div>
  );
}
