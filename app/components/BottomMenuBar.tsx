export const BottomMenuBar = () => {
  return (
    <div className="bg-base-dark h-16 w-full flex items-center justify-around">
      <button className="h-16">
        <div className="flex flex-col justify-center">
          <i className="text-white ri-home-8-line ri-2x" />
          <span className="text-white text-xs">Home</span>
        </div>
      </button>
      <button className="h-16">
        <div className="flex flex-col justify-center">
          <i className="text-white ri-questionnaire-line ri-2x" />
          <span className="text-white text-xs">Quiz</span>
        </div>
      </button>
      <button className="h-16">
        <div className="flex flex-col justify-center">
          <i className="text-white ri-file-list-line ri-2x" />
          <span className="text-white text-xs">Word List</span>
        </div>
      </button>
      <button className="h-16">
        <div className="flex flex-col justify-center">
          <i className="text-white ri-account-circle-line ri-2x" />
          <span className="text-white text-xs">Account</span>
        </div>
      </button>
    </div>
  );
};
