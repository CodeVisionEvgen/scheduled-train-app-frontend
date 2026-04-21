import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ScheduledTrain = {
  id: string;
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
};
