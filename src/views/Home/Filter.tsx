import { Fragment } from 'react';
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

export interface IFilter {
  label: string;
  options: string[],
  value: string[],
  onChange: (value: string[]) => void;
  renderOption: (options: IFilterOption) => JSX.Element
}

export interface IFilterOption {
  option: string;
  selected: boolean;
  onClick: () => void;
}

export function Filter({ label, options, value, onChange, renderOption }: IFilter) {
  let toggleOption = (option: string, selected: boolean) => {
    if (selected) {
      // remove
      if (value.length === 1) {
        // if it's the last option selected, select all the options
        onChange(options)
      } else {
        onChange(value.filter(i => i !== option))
      }
    }  else {
      // add 
      onChange(value.concat(option))
    }
  };

  return (
    <FilterContainer>
      <p className="filter-label">{label}</p>
      <div className="filter-options">
        {options.map((option, index) => {
          let selected = value.includes(option)
          return (<Fragment key={index}>
            {renderOption({ 
            option, 
            onClick: () => toggleOption(option, selected),
            selected
          })}
          </Fragment>
          )
        })}
      </div>
    </FilterContainer>
  );
}


const StyledShapeOption = styled.button<{ selected: boolean }>`
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

export const ShapeOption = ({ option, selected, onClick }: IFilterOption) => (
  <StyledShapeOption onClick={onClick} selected={selected}>
    {option}
  </StyledShapeOption>
);

const StyledColorOption = styled.button<{ selected: boolean; option: string }>`
width: 34px;
height: 34px;
border-radius: 100%;
background: color;
display: inline-block;
background: ${(props) => props.option};
border: 2px solid transparent;

${(props) =>
  props.selected &&
  css`
  border: 2px solid rgba(0,0,0,.8);
  box-shadow: 5px 5px 10px 3px rgb(0 0 0 / 20%);
  `}
  `;
  
export const ColorOption = (props: IFilterOption) => <StyledColorOption {...props}/>