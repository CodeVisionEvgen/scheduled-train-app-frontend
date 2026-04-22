import { Label } from "@heroui/react";
type IProps = {
  onChange: (text: string) => void;
};
export const TableSearch = ({ onChange }: IProps) => {
  return (
    <div>
      <Label>Search scheduled trains (From/To)</Label>
      <div className="flex items-center gap-2">
        <input
          onInput={(e) => {
            onChange(e.currentTarget.value);
          }}
          aria-label="Search scheduled trains (From/To)"
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-max border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};
