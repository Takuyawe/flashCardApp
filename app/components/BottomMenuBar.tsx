import { CustomNavLink } from './CustomNavLink';

export const BottomMenuBar = () => {
  return (
    <div className="bg-base-dark h-16 w-full flex items-center justify-around">
      <CustomNavLink
        to="/users/clv0qs04i00006d6c18akraw9"
        icon="ri-home-8-line"
        text="Home"
      />
      <CustomNavLink
        to="/users/clv0qs04i00006d6c18akraw9/quiz"
        icon="ri-questionnaire-line"
        text="Quiz"
      />
      <CustomNavLink
        to="/users/clv0qs04i00006d6c18akraw9/word-list"
        icon="ri-file-list-line"
        text="Word List"
      />
      <CustomNavLink
        to="/users/clv0qs04i00006d6c18akraw9/account"
        icon="ri-account-circle-line"
        text="Account"
      />
    </div>
  );
};
