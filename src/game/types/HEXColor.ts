export type HEXColor = string;

export function assertHexColor(value: string): asserts value is HEXColor {
  const hexColorRegex = /^#([0-9a-fA-F]{3}){1,2}$/;
  if (!hexColorRegex.test(value)) {
    throw new Error(`"${value}" is not a valid hexadecimal color code.`);
  }
}
