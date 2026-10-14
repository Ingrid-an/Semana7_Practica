import Header from './components/Header.jsx'
import Reproductor from './sections/Reproductor.jsx'
import Novedades from './sections/Novedades.jsx'
import Catalogo from './sections/Catalogo.jsx'
import Artistas from './sections/Artistas.jsx'
import { useTheme } from './context/ThemeContext.jsx'

// SPA de una sola página: cada sección es un componente independiente
export default function App() {
  // PASO 3: el tema se lee del contexto, sin props
  const { tema } = useTheme()

  return (
    <div className="app" data-tema={tema}>
      <p className="franja">✦ Envío de buenas vibras gratis · Nuevos podcasts cada semana ✦</p>
      <Header />
      <main>
        <Reproductor />   {/* PASO 1 · useReducer */}
        <Novedades />     {/* PASO 2 · useEffect + AbortController */}
        <Catalogo />      {/* PASO 4 · useMemo / useCallback / useRef */}
        <Artistas />      {/* PASO 5 · useFetch */}
      </main>
      <footer className="pie">
        <span className="logo-nombre">SoundWave <span aria-hidden="true">♡</span></span>
        <p>Música y podcasts para cada momento · UNCP 2026</p>
      </footer>
    </div>
  )
}
