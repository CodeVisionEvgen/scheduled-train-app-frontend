type IProps = {
  items: string[];
};
export const List = ({ items }: IProps) => {
  return (
    <ul className="space-y-2 list-disc border bg-background border-default rounded p-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-sm font-mono ml-4 text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
