import { Texture, BaseTexture, Rectangle } from "@pixi/core";

export const makeFrame = (
  image: string,
  coords: [number, number, number, number]
) => new Texture(new BaseTexture(image), new Rectangle(...coords));
