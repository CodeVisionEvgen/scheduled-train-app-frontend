import { DateField, Label, Tooltip } from "@heroui/react";
type IProps = {
  onChange: (text: string) => void;
};
export const TableDateField = ({ onChange }: IProps) => {
  return (
    <Tooltip>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Search trains by depature date
      </Tooltip.Content>
      <Tooltip.Trigger>
        <Label>Search trains by depature date</Label>

        <DateField
          onChange={(date) => {
            const userTimeZone =
              Intl.DateTimeFormat().resolvedOptions().timeZone;
            const departure = date?.toDate(userTimeZone).toISOString();
            onChange(departure || "");
          }}
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
