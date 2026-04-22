import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IScheduledTrain = {
  id: number;
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  createdAt: string;
  updatedAt: string;
};
