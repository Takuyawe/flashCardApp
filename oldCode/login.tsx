import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Auth } from '@supabase/auth-ui-react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authenticator } from '~/auth.server';
import { SocialAccountButton } from '~/components/login/SocialAccountButton';
import { convertTextToProvider } from '~/modules/convertTextToProvider';
import { createSupabaseServerClient } from '~/supabase.server';

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { supabaseClient, headers } = createSupabaseServerClient(request);

//   const formData = await request.formData();
//   const text = formData.get('text');

//   const provider = convertTextToProvider(text as string);

//   const { data, error } = await supabaseClient.auth.signInWithOAuth({
//     provider,
//     options: {
//       redirectTo: 'https://flash-card-app-mu.vercel.app/',
//     },
//   });

//   if (error) {
//     console.log('error', error);
//   }

//   if (data.url) return redirect(data.url);
//   return json({ data, error });
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate('user-login', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};

export default function Login() {
  return (
    <div className="mx-auto mt-10 h-1/5 w-2/3 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-2">
        <span className="text-xl mb-8">Sign In with SNS</span>
        <div className="flex flex-col gap-y-4">
          {/* <SocialAccountButton
            text="Google"
            Icon={FcGoogle}
            iconProps={{ className: 'size-7' }}
          />
          <SocialAccountButton
            text="Facebook"
            Icon={FaFacebook}
            iconProps={{ className: 'size-7 text-facebook' }}
          /> */}
          <Form method="post">
            <input type="email" name="email" required />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
            <button type="submit">Sign In</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
