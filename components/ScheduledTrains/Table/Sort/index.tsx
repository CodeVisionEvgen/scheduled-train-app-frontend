import { Label, Select, ListBox, Description, Header } from "@heroui/react";

export const TableSort = () => {
  return (
    <Select className="w-[256px] h-[42px]" placeholder="Select one">
      <Label>Sort trains</Label>
      <Select.Trigger className="h-[42px]">
        <Select.Value className="h-[42px]" />
        <Select.Indicator className="h-[42px]" />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="Departure-DESC" textValue="Departure-DESC">
            Departure date: DESC
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="Departure-ASC" textValue="Departure-ASC">
            Departure date: ASC
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
