import { SVGProps } from 'react';
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type UnitCategory = 'length' | 'weight' | 'temperature';

export interface units {
  name: string;
  convertFrom: (value: number, unit: string) => number;
  convertTo: (value: number, unit: string) => number;
}
