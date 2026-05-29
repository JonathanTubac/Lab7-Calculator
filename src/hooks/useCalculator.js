import { useState } from 'react'

const MAX_DIGITS = 9
const MAX_VAL = 999999999

const compute = (a, b, op) => {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b === 0 ? NaN : a / b
  if (op === '%') return a % b
  return b
}

const formatResult = (value) => {
  if (isNaN(value) || value < 0 || value > MAX_VAL) return 'ERROR'
  if (Number.isInteger(value)) return String(value)
  const intPart = String(Math.trunc(value))
  const available = MAX_DIGITS - intPart.length - 1
  if (available <= 0) return intPart
  return String(parseFloat(value.toFixed(available)))
}

const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
      return
    }
    if (display.length >= MAX_DIGITS) return
    setDisplay(display === '0' ? digit : display + digit)
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (display.includes('.') || display.length >= MAX_DIGITS) return
    setDisplay(display + '.')
  }

  const applyOp = (prev, curr, op) =>
    formatResult(compute(parseFloat(prev), parseFloat(curr), op))

  const handleOperation = (op) => {
    if (prevValue !== null && !waitingForOperand) {
      const result = applyOp(prevValue, display, operation)
      setDisplay(result)
      setPrevValue(result === 'ERROR' ? null : result)
      setOperation(result === 'ERROR' ? null : op)
      setWaitingForOperand(true)
      return
    }
    setPrevValue(waitingForOperand ? prevValue : display)
    setOperation(op)
    setWaitingForOperand(true)
  }

  const handleEqual = () => {
    if (prevValue === null || operation === null) return
    setDisplay(applyOp(prevValue, display, operation))
    setPrevValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handleToggle = () => {
    if (display === 'ERROR' || display === '0') return
    if (display.startsWith('-')) return setDisplay(display.slice(1))
    if (('-' + display).length <= MAX_DIGITS) setDisplay('-' + display)
  }

  const handleClear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handleInput = (label) => {
    if ('0123456789'.includes(label)) return handleDigit(label)
    if (label === '.') return handleDecimal()
    if (['+', '-', '*', '/', '%'].includes(label)) return handleOperation(label)
    if (label === '=') return handleEqual()
    if (label === '+/-') return handleToggle()
    if (label === 'C') return handleClear()
  }

  return { display, handleInput, operation }
}

export default useCalculator
