import items from "../../generate_items";
import { useMemo, useState } from "react";
import styled  from "styled-components";
import { shapes as allShapes, colors as allColors } from "../../constants";
import { Header } from "./Header";
import { Container } from "./styles";
import { Item } from "./Item";
import { Filter, ShapeOption, ColorOption } from "./Filter";

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 40px;
`;

const GridTitle = styled.div`
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 18px;

  .item-count {
    font-weight: 400;
    font-size: 14px;
    color: rgba(0,0,0,.8);
  }
`

const FiltersHeading = styled.h3`
  margin-bottom: 15px;
  font-size: 22px;
`

export default function Home() {
  const [selectedShapes, setSelectedShapes] = useState<string[]>(allShapes);
  const [selectedColors, setSelectedColors] = useState<string[]>(allColors);

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        selectedShapes.indexOf(item.shape) > -1 &&
        selectedColors.indexOf(item.color) > -1
    );
  }, [selectedShapes, selectedColors]);

  const gridTitle = useMemo(() => {
    let shapes = selectedShapes;
    let colors = selectedColors;

    const selectedAllShapes = shapes.length === allShapes.length;
    const selectedAllColors = colors.length === allColors.length;

    const selectedSingleColor = colors.length === 1;
    const selectedSingleShape = shapes.length === 1;

    const selectedMultipleShapes = shapes.length > 1;
    const selectedMultipleColors = colors.length > 1;

    if (selectedAllShapes && selectedAllColors) {
      return "All Items:";
    } else if (selectedMultipleShapes && selectedMultipleColors) {
      return "Multiple Items:";
    } else if (selectedAllShapes && selectedSingleColor) {
      return `All ${colors[0]} Items:`;
    } else if (selectedAllColors && selectedSingleShape) {
      return `All ${shapes[0]} Items:`;
    } else if (selectedSingleColor && selectedMultipleShapes) {
      return `Multiple ${colors[0]} Items:`;
    } else if (selectedMultipleColors && selectedSingleShape) {
      return `Multiple ${shapes[0]} Items:`;
    } else if (selectedSingleColor && selectedSingleShape) {
      return `${colors[0]} ${shapes[0]} Items:`;
    } else return `No item`;
  }, [selectedShapes, selectedColors]);

  return (
    <div className="Home">
      <Header />
      <Container>
        <div>
          <FiltersHeading>Filters</FiltersHeading>
          <Filter
            label="Shapes"
            items={allShapes}
            onChange={setSelectedShapes}
            value={selectedShapes}
            OptionComponent={ShapeOption}
          />

          <Filter
            label="Colors"
            items={allColors}
            onChange={setSelectedColors}
            value={selectedColors}
            OptionComponent={ColorOption}
          />
        </div>

        {/*  grid title */}
        <GridTitle>
          {gridTitle} <span className="item-count">({filteredItems.length})</span>
        </GridTitle>

        <ItemGrid>
          {filteredItems.map(({ shape, color, ...rest }, index) => {
            return <Item key={index} shape={shape} color={color} {...rest} />;
          })}
        </ItemGrid>
      </Container>
    </div>
  );
}
