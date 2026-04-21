import { VerticalDots } from "@/components/icons";
import { ModalConfirmDanger } from "@/components/Modals/ConfirmDanger";
import { ScheduledTrain } from "@/types";
import { Button, Dropdown, Label } from "@heroui/react";

type IProps = {
  item: ScheduledTrain;
};

export const TableActionsDropdown = ({ item }: IProps) => {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        <VerticalDots size={16} color="white" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="open" textValue="Open">
            <Label>Open</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <ModalConfirmDanger
              Trigger={<Label>Delete</Label>}
              message="test"
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
