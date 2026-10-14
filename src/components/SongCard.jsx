// Tarjeta de canción reutilizable (pasos 4 y 5)
// PASO 4 · BONUS ✍️: envuelve este componente en React.memo para que no se
// re-renderice si sus props no cambian. Combínalo con useCallback en el padre.

const TONOS = { Pop: 340, Indie: 20, Jazz: 280, 'Lo-fi': 200, Rock: 0, 'Reggaetón': 40, 'Clásica': 260, Podcast: 320 }

export default function SongCard({ cancion, meGusta = false, onMeGusta }) {
  const tono = TONOS[cancion.genero] ?? 330
  return (
    <article className="cancion">
      <div
        className="cancion-portada"
        style={{ background: `linear-gradient(140deg, hsl(${tono} 55% 78%), hsl(${tono} 45% 58%))` }}
        aria-hidden="true"
      >
        {cancion.genero === 'Podcast' ? '🎙️' : '♪'}
      </div>
      <div className="cancion-info">
        <h3>{cancion.titulo}</h3>
        <p>{cancion.artista}</p>
        <span className="cancion-genero">{cancion.genero}{cancion.duracion && ` · ${cancion.duracion}`}</span>
      </div>
      {onMeGusta && (
        <button
          type="button"
          className={meGusta ? 'corazon activo' : 'corazon'}
          aria-pressed={meGusta}
          aria-label={meGusta ? `Quitar ${cancion.titulo} de favoritos` : `Me gusta ${cancion.titulo}`}
          onClick={() => onMeGusta(cancion.id)}
        >
          {meGusta ? '♥' : '♡'}
        </button>
      )}
    </article>
  )
}
