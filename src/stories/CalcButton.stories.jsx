import Button from '../components/Button'
import '../App.css'

export default {
  title: 'Calculator/Button',
  component: Button,
  parameters: { layout: 'centered' },
}

const make = (label, type) => ({ args: { label, type, onClick: () => {} } })

export const Digit = make('7', 'digit')

export const Operator = make('+', 'op')

export const Equal = make('=', 'equal')

export const Clear = make('C', 'clear')

export const Toggle = make('+/-', 'toggle')

export const Decimal = make('.', 'decimal')

export const Modulo = make('%', 'mod')
