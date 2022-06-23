interface IHorizontalRule {
  className?: string;
}

/*
 * React component which displays a "Horizontal Rule" on the page.
 */
export const HorizontalRule: React.FC<IHorizontalRule> = ({ className }) => {
  return (
    <div
      className={[
        'w-full',
        'border-t outline-3 border-gray-400',
        'overflow-y-scroll hide-scroll-bar',
        className,
      ].join(' ')}
    />
  );
};
