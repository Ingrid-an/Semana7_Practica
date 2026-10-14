import { useTheme } from '../context/ThemeContext.jsx'

export default function Header() {
  // PASO 3: el botón cambia el tema global sin recibir nada por props
  const { tema, alternarTema } = useTheme()

  return (
    <header className="cabecera">
      <a className="logo" href="#inicio">
        <span className="logo-nombre">SoundWave <span aria-hidden="true">♡</span></span>
        <small>música &amp; podcasts</small>
      </a>
      <nav className="menu" aria-label="Secciones">
        <a href="#inicio">Inicio</a>
        <a href="#novedades">Novedades</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#artistas">Artistas</a>
      </nav>
      <button type="button" className="tema-btn" onClick={alternarTema}>
        {tema === 'claro' ? '🌙 Modo Concierto' : '☀️ Modo Estudio'}
      </button>
    </header>
  )
}
