import { ActionFunctionArgs, json } from '@remix-run/node';
import { Auth } from '@supabase/auth-ui-react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SocialAccountButton } from '~/components/login/SocialAccountButton';
import { convertTextToProvider } from '~/modules/convertTextToProvider';
import { createSupabaseServerClient } from '~/supabase.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  const formData = await request.formData();
  const text = formData.get('text');

  const provider = convertTextToProvider(text as string);

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: { redirect_to: 'https://flash-card-app-mu.vercel.app/' },
    },
  });
  console.log(data);

  if (error) {
    console.log('error', error);
  }

  return json({ data, error });
};

export default function Login() {
  return (
    <div className="mx-auto mt-10 h-1/5 w-2/3 border border-base-dark shadow-lg rounded-lg animate-fade-in">
      <div className="flex flex-col h-full items-center justify-start p-2">
        <span className="text-xl mb-8">Sign In with SNS</span>
        <div className="flex flex-col gap-y-4">
          <SocialAccountButton
            text="Google"
            Icon={FcGoogle}
            iconProps={{ className: 'size-7' }}
          />
          <SocialAccountButton
            text="Facebook"
            Icon={FaFacebook}
            iconProps={{ className: 'size-7 text-facebook' }}
          />
        </div>
      </div>
    </div>
  );
}
