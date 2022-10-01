import { EnumSliderXOptions } from "../types/types";
export function isFlagSet(
  testValue: number,
  flag: EnumSliderXOptions
): boolean {
  {
    return (testValue & flag) == flag;
  }
}
