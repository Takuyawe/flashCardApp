import { ACCOUNT_HOME, QUIZ, WORD, WORD_LIST } from '~/constants/Path';
import { CustomNavLink } from './CustomNavLink';

export const BottomMenuBar = () => {
  return (
    <div className="bg-base-dark h-14 w-full flex items-center justify-around">
      <CustomNavLink to={WORD} icon="ri-home-8-line" text="Home" />
      <CustomNavLink to={QUIZ} icon="ri-questionnaire-line" text="Quiz" />
      <CustomNavLink to={WORD_LIST} icon="ri-file-list-line" text="Word List" />
      <CustomNavLink
        to={ACCOUNT_HOME}
        icon="ri-account-circle-line"
        text="Account"
      />
    </div>
  );
};
