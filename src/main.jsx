import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'
import './index.css'

// PASO 1: StrictMode está activo. En desarrollo, React monta, desmonta y vuelve
// a montar los componentes para detectar efectos sin cleanup (ver Paso 2).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* PASO 3: el Provider envuelve toda la app para que cualquier componente lea el tema */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
