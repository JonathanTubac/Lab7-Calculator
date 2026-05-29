import Keyboard from '../components/Keyboard'
import '../App.css'

export default {
  title: 'Calculator/Keyboard',
  component: Keyboard,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="calculator">
        <Story />
      </div>
    ),
  ],
}

export const Default = {
  args: { onInput: (label) => console.log('pressed:', label) },
}
