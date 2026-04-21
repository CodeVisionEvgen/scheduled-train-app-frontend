import { DateField, Label, Tooltip } from "@heroui/react";

export const TableDateField = () => {
  return (
    <Tooltip>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Search trains by depature date
      </Tooltip.Content>
      <Tooltip.Trigger>
        <Label>Search trains by depature date</Label>

        <DateField
          aria-label="Search trains by depature date"
          className="w-full sm:w-[250px] h-[42px]"
          name="date"
        >
          <DateField.Group className=" h-[42px]" variant="secondary">
            <DateField.Input className=" h-[42px]">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </Tooltip.Trigger>
    </Tooltip>
  );
};
