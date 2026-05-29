import Calculator from '../components/Calculator'
import '../App.css'

export default {
  title: 'Calculator/Calculator',
  component: Calculator,
  parameters: { layout: 'centered' },
}

export const Default = {}

export const WithBackground = {
  decorators: [
    Story => (
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', padding: '40px', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
}
