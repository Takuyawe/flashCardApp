type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, children }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light">
      {children}
    </div>
  );
};
