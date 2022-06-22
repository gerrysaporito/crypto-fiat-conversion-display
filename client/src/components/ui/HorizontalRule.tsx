interface IHorizontalRule {
  width?: 'full';
  className?: string;
}
export const HorizontalRule: React.FC<IHorizontalRule> = ({
  width,
  className,
}) => {
  return (
    <div
      className={[
        'w-full',
        'border-t outline-3 border-gray-400',
        className,
      ].join(' ')}
    />
  );
};
