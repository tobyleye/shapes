import items from "../../items";
import { ChangeEvent, useMemo, useState } from "react";
import styled from "styled-components";
import { shapes as allShapes, colors as allColors } from "../../constants";
import { Header } from "./Header";
import { Container } from "./styles";
import { Item } from "./Item";

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const ShapeCheckbox = ({
  name,
  checked,
  onChange
}: {
  name: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label style={{
      border: '1px solid',
      borderColor: checked ? 'rgba(0,0,255,.4)' : '#ccc',
      background: checked ?  'rgba(0,0,255, .05)': undefined,
      display: "inline-block",
      marginRight: 4,
      padding: '5px 10px',
      borderRadius: 99,
    }}>
      {name}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ display: 'none'}}
      />
    </label>
  );
};

const ColorCheckbox = ({
  name,
  checked,
  onChange
}: {
  name: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label
      htmlFor={name}
      style={{
        width: 34,
        height: 34,
        borderRadius: "100%",
        background: name,
        display: "inline-block",
        marginRight: 5,
        border: checked ? "2px solid black" : undefined
      }}
    >
      <input
        checked={checked}
        name={name}
        onChange={onChange}
        type="checkbox"
        id={name}
        style={{ display: "none" }}
      />
    </label>
  );
};

export default function Home() {
  const [filters, setFilters] = useState({
    shapes: allShapes, // select all shapes
    colors: allColors // select all colors by default
  });

  const { shapes, colors } = filters;

  const toggleShape = (evt: ChangeEvent<HTMLInputElement>) => {
    let { checked, name } = evt.target;
    let shapes = checked
      ? [...filters.shapes, name]
      : filters.shapes.filter((shape) => shape !== name);

    setFilters((filters) => {
      return {
        ...filters,
        shapes
      };
    });
  };

  const toggleColor = (evt: ChangeEvent<HTMLInputElement>) => {
    let { checked, name } = evt.target;
    console.log({ checked, name });

    let colors = checked
      ? [...filters.colors, name]
      : filters.colors.filter((color) => color !== name);
    setFilters((filters) => {
      return {
        ...filters,
        colors
      };
    });
  };

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        filters.colors.indexOf(item.color) > -1 &&
        filters.shapes.indexOf(item.shape) > -1
    );
  }, [filters]);

  const gridTitle = useMemo(() => {
    const selectedAllShapes = shapes.length === allShapes.length;
    const selectedAllColors = colors.length === allColors.length;

    const selectedSingleColor = colors.length === 1;
    const selectedSingleShape = shapes.length === 1;

    const selectedMultipleShapes = shapes.length > 1;
    const selectedMultipleColors = colors.length > 1;

    if (selectedAllShapes && selectedAllColors) {
      return "All Items:";
    } else if (
      selectedMultipleShapes && selectedMultipleColors
    ) {
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
      return `${shapes[0]} ${colors[0]} Items:`;
    }
  }, [shapes, colors]);

  return (
    <div className="Home">
      <Header />
      <Container>
        <div>
          <div style={{ marginBottom: 20}}>
            <p>Shapes</p>
            {allShapes.map((shape, index) => {
              return (
                <ShapeCheckbox
                  name={shape}
                  checked={filters.shapes.indexOf(shape) > -1}
                  onChange={toggleShape}
                />
              );
            })}
          </div>

          <div style={{ marginBottom: 20}}>
            <p>colors</p>
            {allColors.map((color, index) => {
              return (
                <ColorCheckbox
                  name={color}
                  checked={filters.colors.indexOf(color) > -1}
                  onChange={toggleColor}
                />
              );
            })}
          </div>
        </div>

        {/*  grid title */}
        <div style={{ marginBottom: 5}}>
          {gridTitle} ({filteredItems.length})
        </div>

        <ItemGrid>
          {filteredItems.map(({ shape, color, ...rest }, index) => {
            return <Item key={index} shape={shape} color={color} {...rest} />;
          })}
        </ItemGrid>
      </Container>
    </div>
  );
}
