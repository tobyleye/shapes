import styled, { css } from 'styled-components'

const FilterContainer = styled.div`
  margin-bottom: 35px;

  .filter-label {
    color: #0085ef;
    margin-bottom: 8px;
  }

  .filter-options {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    
    > * {
      flex-shrink: none;
    }
  }
`

interface IFilter {
  label: string;
  items: string[],
  value: string[],
  onChange: (value: string[]) => void;
  ItemComponent: (options: IFilterOption) => JSX.Element
}

interface IFilterOption {
  item: string;
  selected: boolean;
  onClick: () => void;
}

export function Filter({ label, items, value, onChange, ItemComponent }: IFilter) {
  let toggleItem = (item: string) => {
    if (value.includes(item)) {
      // if it's the last item
      if (value.length === 1) {
        // select all the items
        onChange(items)
      } else {
        onChange(value.filter((i) => i !== item));
      }
    } else {
      onChange(value.concat(item));
    }
  };

  return (
    <FilterContainer>
      <p className="filter-label">{label}</p>
      <div className="filter-options">
        {items.map((item, index) => {
          return (
            <ItemComponent
              key={index}
              item={item}
              onClick={toggleItem.bind(null, item)}
              selected={value.includes(item)}
            />
          );
        })}
      </div>
    </FilterContainer>
  );
}


const StyledShape = styled.button<{ selected: boolean }>`
  border: 1px solid;
  border-color: #ccc;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 99px;
  text-transform: capitalize;

  ${(props) =>
    props.selected &&
    css`
      border-color: rgba(0, 0, 255, 0.4);
      background-color: rgba(0, 0, 255, 0.1);
    `}
`;


export const ShapeOption = ({ item, selected, onClick }: IFilterOption) => (
  <StyledShape onClick={onClick} selected={selected}>
    {item}
  </StyledShape>
);

export const ColorOption = styled.button<{ selected: boolean; item: string }>`
  width: 34px;
  height: 34px;
  border-radius: 100%;
  background: color;
  display: inline-block;
  background: ${(props) => props.item};
  border: 2px solid transparent;

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid rgba(0,0,0,.8);
      box-shadow: 5px 5px 10px 3px rgb(0 0 0 / 20%);
    `}
`;
