import { Form } from '@remix-run/react';

type IconProps = {
  className?: string;
};

type Props = {
  text: string;
  Icon: React.ElementType;
  iconProps?: IconProps; // Additional props for the icon
};

export const SocialAccountButton = ({ text, Icon, iconProps }: Props) => {
  return (
    <Form method="post">
      <input type="hidden" name="text" value={text} />
      <button type="submit" className="outline rounded-md py-1 px-2">
        <div className="flex gap-x-1 items-center">
          <Icon {...iconProps} />
          <span className="text-sm">Sign in with {text}</span>
        </div>
      </button>
    </Form>
  );
};
