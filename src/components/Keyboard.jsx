import Button from './Button'
import { BUTTONS } from '../constants/buttons'

const Keyboard = ({ onInput }) => (
  <div className="calc-keyboard">
    {BUTTONS.map(btn => (
      <Button key={btn.label} label={btn.label} type={btn.type} onClick={onInput} />
    ))}
  </div>
)

export default Keyboard
