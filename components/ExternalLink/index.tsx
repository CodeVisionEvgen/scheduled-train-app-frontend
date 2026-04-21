interface IProps {
  href: string;
  label: string;
}

export const ExternalLink = ({ href, label }: IProps) => {
  return (
    <a className="flex" href={href}>
      {label}
      <div className="mt-[-4px] text-xs ml-1">🡥</div>
    </a>
  );
};
