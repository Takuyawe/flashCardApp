import { ACCOUNT_HOME, BROWSE, QUIZ, WORD } from '~/constants/Path';
import { CustomNavLink } from './CustomNavLink';

export const BottomMenuBar = () => {
  return (
    <div className="bg-base-dark h-14 w-full flex">
      <CustomNavLink to={WORD} icon="ri-home-8-line" text="Home" />
      <CustomNavLink to={QUIZ} icon="ri-questionnaire-line" text="Quiz" />
      <CustomNavLink to={BROWSE} icon="ri-file-list-line" text="Browse" />
      <CustomNavLink
        to={ACCOUNT_HOME}
        icon="ri-account-circle-line"
        text="Account"
      />
    </div>
  );
};
