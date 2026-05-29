import Display from '../components/Display'
import '../App.css'

export default {
  title: 'Calculator/Display',
  component: Display,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="calculator">
        <Story />
      </div>
    ),
  ],
}

export const Default = { args: { value: '0' } }

export const MultiDigit = { args: { value: '123456789' } }

export const WithDecimal = { args: { value: '3.1428571' } }

export const Error = { args: { value: 'ERROR' } }

export const Negative = { args: { value: '-42' } }
