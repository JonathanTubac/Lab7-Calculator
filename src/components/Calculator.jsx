import Display from './Display'
import Keyboard from './Keyboard'
import useCalculator from '../hooks/useCalculator'

const Calculator = () => {
  const { display, handleInput } = useCalculator()
  return (
    <div className="calculator">
      <Display value={display} />
      <Keyboard onInput={handleInput} />
    </div>
  )
}

export default Calculator
