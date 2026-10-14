import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import SongCard from '../components/SongCard.jsx'
// eslint-disable-next-line no-unused-vars
import { CATALOGO, GENEROS_CATALOGO } from '../data/catalogo.js'

const MAX_VISIBLES = 24

export default function Catalogo() {
  // TODO 1: estados → busqueda (''), genero ('Todos'), playlist (new Set())
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState('Todos')
  const [playlist, setPlaylist] = useState(new Set())

  // TODO 4: useRef para el input de búsqueda
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [])

  // TODO 2 · useMemo: filtradas = CATALOGO filtrado por título/artista y género
  const filtradas = useMemo(() => {
    const textoBusqueda = busqueda.toLowerCase().trim()

    return CATALOGO.filter((c) => {
      const coincideGenero = genero === 'Todos' || c.genero === genero
      const coincideTexto =
        c.titulo.toLowerCase().includes(textoBusqueda) ||
        c.artista.toLowerCase().includes(textoBusqueda)
      return coincideGenero && coincideTexto
    })
  }, [busqueda, genero])

  // TODO 3 · useCallback: alternarPlaylist(id) agrega/quita el id del Set
  const alternarPlaylist = useCallback((id) => {
    setPlaylist((prev) => {
      const nuevoSet = new Set(prev)
      if (nuevoSet.has(id)) {
        nuevoSet.delete(id)
      } else {
        nuevoSet.add(id)
      }
      return nuevoSet
    })
  }, [])

  // Atajo para el botón "🔍" que enfoca el input
  const enfocarBuscador = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <section id="catalogo" className="seccion seccion-rosa">
      <div className="seccion-cabecera">
        <div>
          <p className="script-titulo">Para cada momento</p>
          <h2>Catálogo completo</h2>
        </div>
        <p className="playlist-contador">♥ {playlist.size} en tu playlist</p>
      </div>

      <div className="filtros">
        <input
          ref={inputRef}
          type="search"
          className="buscador"
          placeholder="Busca una canción o artista..."
          aria-label="Buscar canción o artista"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-sec"
          aria-label="Ir al buscador"
          onClick={enfocarBuscador}
        >
          🔍
        </button>
      </div>

      <div className="generos" role="group" aria-label="Filtrar por género">
        {GENEROS_CATALOGO.map((g) => (
          <button
            key={g}
            type="button"
            className={g === genero ? 'genero activo' : 'genero'}
            onClick={() => setGenero(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="nota">
        {filtradas.length.toLocaleString('es-PE')} canciones encontradas
        {filtradas.length > MAX_VISIBLES && ` · mostrando ${MAX_VISIBLES}`}
      </p>

      {filtradas.length === 0 ? (
        <p className="vacio">No hay canciones que coincidan con “{busqueda}”.</p>
      ) : (
        <div className="grid-canciones">
          {filtradas.slice(0, MAX_VISIBLES).map((c) => (
            <SongCard
              key={c.id}
              cancion={c}
              meGusta={playlist.has(c.id)}
              onMeGusta={alternarPlaylist}
            />
          ))}
        </div>
      )}
    </section>
  )
}