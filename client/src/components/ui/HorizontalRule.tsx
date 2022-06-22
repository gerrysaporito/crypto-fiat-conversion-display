interface IHorizontalRule {
  width?: 'full';
  classNames?: string;
}
export const HorizontalRule: React.FC<IHorizontalRule> = ({
  width,
  classNames,
}) => {
  return (
    <div
      className={[
        'w-full',
        'border-t outline-3 border-gray-400',
        classNames,
      ].join(' ')}
    />
  );
};
