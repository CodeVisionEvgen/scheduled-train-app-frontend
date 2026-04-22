"use client";

import { useEffect, useState } from "react";
import { DateRangePicker, DateField, Label } from "@heroui/react";
import { parseAbsoluteToLocal, DateValue } from "@internationalized/date";
import { IScheduledTrain } from "@/types";

type Props = {
  item?: IScheduledTrain;
  onChange: (val: DateRange) => void;
};

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export const WrappedDatePicker = ({ item, onChange }: Props) => {
  const departure = item?.departure;
  const arrival = item?.arrival;

  const [value, setValue] = useState<DateRange>({
    start: parseAbsoluteToLocal(
      departure ? departure : new Date().toISOString(),
    ),
    end: parseAbsoluteToLocal(arrival ? arrival : new Date().toISOString()),
  });

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <DateRangePicker
      value={departure && arrival ? value : undefined}
      onChange={(val) => {
        setValue(val as DateRange);
      }}
      hourCycle={24}
      granularity="minute"
      hideTimeZone
    >
      <Label>Departure - Arrival</Label>

      <DateField.Group variant="secondary">
        <DateField.InputContainer>
          <DateField.Input slot="start">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>

          <DateRangePicker.RangeSeparator />

          <DateField.Input slot="end">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.InputContainer>
      </DateField.Group>
    </DateRangePicker>
  );
};
