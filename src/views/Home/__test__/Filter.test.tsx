import { fireEvent, render, screen } from "@testing-library/react"
import { Filter, IFilterOption } from "../Filter"

let items
let [item1, item2, item3] = items = ['item a', 'item b', 'item c']

const renderFilter = ({
    label = 'test',
    value,
    handleChange = jest.fn()
}) => {
    const Item = ({ item, ...props }: IFilterOption) => <button {...props}>{item}</button>
    render(<Filter label={label} items={items} value={value} onChange={handleChange} ItemComponent={Item} />)
}


test('renders filter label', () => {
    let value = [];
    let label = 'test'
    renderFilter({
        label,
        value
    })
    screen.getByText(label)
})

test('clicking on unselected item selects it', () => {
    let value = [];
    let handleChange = jest.fn();
    renderFilter({
        handleChange,
        value
    })
    fireEvent.click(screen.getByRole('button', { name: item1 }))
    expect(handleChange).toBeCalledWith([item1])
})

test('clicking on an already selected item unselects it', () => {

    let value = [item1, item2, item3]
    let handleChange = jest.fn();
    renderFilter({
        handleChange,
        value
    })

    fireEvent.click(screen.getByRole('button', { name: item1 }))
    expect(handleChange).toBeCalledWith([item2, item3])
})

test('diselecting the last filter should select all filters', () => {
    let value = [item1]
    let handleChange = jest.fn();
    renderFilter({
        handleChange,
        value
    })

    fireEvent.click(screen.getByRole('button', { name: item1 }))
    expect(handleChange).toBeCalledWith([item1, item2, item3])
})



