import { VerticalDots } from "@/components/icons";
import { IScheduledTrain } from "@/types";
import { Button, Dropdown, Key, Label } from "@heroui/react";

type IOnActionProps = {
  item: IScheduledTrain;
  key: Key;
};

type IProps = {
  item: IScheduledTrain;
  onAction?: (data: IOnActionProps) => void;
  hideOpenElement?: boolean;
  isMock?: boolean;
};

export const TableActionsDropdown = ({
  item,
  onAction,
  isMock,
  hideOpenElement,
}: IProps) => {
  return (
    <Dropdown>
      <Button isDisabled={isMock} aria-label="Menu" variant="secondary">
        <VerticalDots size={16} />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => {
            onAction?.({ key, item });
          }}
        >
          {!hideOpenElement && (
            <Dropdown.Item id="open" textValue="Open">
              <Label>Open</Label>
            </Dropdown.Item>
          )}
          <Dropdown.Item id="edit" textValue="Edit">
            <Label>Edit</Label>
          </Dropdown.Item>
          <Dropdown.Item id="fullUpdate" textValue="Full Update">
            <Label>Replace Data</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
