import { Label, Select, ListBox } from "@heroui/react";

type IProps = {
  onChange: (text: string) => void;
};

export const TableSort = ({ onChange }: IProps) => {
  return (
    <Select className="w-[256px] h-[42px]" placeholder="Select one">
      <Label>Sort trains</Label>
      <Select.Trigger className="h-[42px]">
        <Select.Value className="h-[42px]" />
        <Select.Indicator className="h-[42px]" />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item
            onClick={() => onChange("DESC")}
            id="Departure-DESC"
            textValue="Departure-DESC"
          >
            Departure date: DESC
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            onClick={() => onChange("ASC")}
            id="Departure-ASC"
            textValue="Departure-ASC"
          >
            Departure date: ASC
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
