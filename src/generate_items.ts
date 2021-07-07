import { colors, shapes } from "./constants";

let items: { shape: string; color: string }[] = [];

for (let shape of shapes) {
  for (let color of colors) {
    items.push({
      shape,
      color
    });
  }
}

export default items;
