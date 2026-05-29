import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useCalculator from '../hooks/useCalculator'

const press = (result, ...labels) => {
  labels.forEach(label => act(() => result.current.handleInput(label)))
}

describe('useCalculator', () => {
  it('muestra 0 al iniciar', () => {
    const { result } = renderHook(() => useCalculator())
    expect(result.current.display).toBe('0')
  })

  it('concatena dígitos correctamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3')
    expect(result.current.display).toBe('123')
  })

  it('ignora el dígito 10 en adelante (límite 9 caracteres)', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0')
    expect(result.current.display).toBe('123456789')
    expect(result.current.display.length).toBe(9)
  })

  it('suma dos números correctamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '4', '2', '+', '8', '=')
    expect(result.current.display).toBe('50')
  })

  it('resta y muestra ERROR si el resultado es negativo', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '3', '-', '5', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('muestra ERROR si el resultado supera 999999999', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '9', '9', '9', '9', '9', '9', '9', '9', '9', '*', '2', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('encadena operaciones mostrando resultado intermedio', () => {
    const { result } = renderHook(() => useCalculator())
    // 3 + 4 → press * → debe mostrar 7 antes de multiplicar
    press(result, '3', '+', '4', '*')
    expect(result.current.display).toBe('7')
  })

  it('divide correctamente y trunca a 9 caracteres (22÷7)', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '2', '2', '/', '7', '=')
    expect(result.current.display.length).toBeLessThanOrEqual(9)
    expect(parseFloat(result.current.display)).toBeCloseTo(3.1428571, 5)
  })

  it('muestra ERROR al dividir por cero', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5', '/', '0', '=')
    expect(result.current.display).toBe('ERROR')
  })

  it('calcula módulo correctamente', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '0', '%', '3', '=')
    expect(result.current.display).toBe('1')
  })

  it('el punto decimal agrega ".0" al inicio y no se puede duplicar', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '3', '.', '.', '1', '4')
    expect(result.current.display).toBe('3.14')
  })

  it('+/- convierte el número a negativo y el menos cuenta como carácter', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5', '+/-')
    // la pantalla no debe mostrar negativos en resultados de ops, pero sí en +/-
    expect(result.current.display).toBe('-5')
    expect(result.current.display.length).toBeLessThanOrEqual(9)
  })

  it('+/- no afecta si el resultado ya tiene 9 chars', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '1', '2', '3', '4', '5', '6', '7', '8', '9')
    press(result, '+/-')
    // ya son 9 chars, no cabría el '-', debe quedarse igual
    expect(result.current.display).toBe('123456789')
  })

  it('C limpia el display y el estado', () => {
    const { result } = renderHook(() => useCalculator())
    press(result, '5', '+', '3', 'C')
    expect(result.current.display).toBe('0')
  })
})
