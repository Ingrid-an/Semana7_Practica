import { createContext, useContext, useState, useMemo } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // TODO 1: crea un estado para el tema con useState. Valor inicial: 'claro'.
  const [tema, setTema] = useState('claro')

  // TODO 2: crea una función alternarTema que cambie 'claro' <-> 'oscuro'.
  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'oscuro' : 'claro'))
  }

  // TODO 3 (bonus): envuelve el objeto value en useMemo
  const value = useMemo(() => {
    return { tema, alternarTema }
  }, [tema])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Hook de conveniencia para consumir el contexto
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}