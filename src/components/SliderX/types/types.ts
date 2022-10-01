export type RGB =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number},${number},${number})`;
export type RGBA =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;
export type HEX = `#${string}`;
export type Color = RGB | RGBA | HEX;

export enum EnumSliderXOptions {
  DynamicColorSampleRight = 1 << 0,
  DisableCenteredOptions = 1 << 1,
}

export type SliderXOptions = EnumSliderXOptions;
