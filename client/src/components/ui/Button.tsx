interface IButton {
  children: React.ReactNode;
  fn: () => void;
  className?: string;
}

export const Button: React.FC<IButton> = (props) => {
  const { className, fn } = props;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (fn) fn();
  };

  console.log('here');
  return (
    <button
      onClick={onClick}
      className={[
        `px-4 py-2 rounded-md`,
        'bg-white text-black',
        'shadow-md active:shadow active:translate-y-[2px] shadow-[#AAAAAA]',
        'uppercase font-semibold',
        className,
      ].join(' ')}
    >
      {props.children}
    </button>
  );
};
