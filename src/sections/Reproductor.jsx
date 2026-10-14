import { useReducer, useRef, useEffect } from 'react'

// Control de volumen del reproductor: Subir (+), Bajar (-), Silenciar (0).

// TODO 1: fuera del componente, un reducer:
function volumenReducer(volumen, accion) {
  switch (accion.type) {
    case 'subir':
      return Math.min(volumen + 1, 10) // máximo 10
    case 'bajar':
      return Math.max(volumen - 1, 0)  // mínimo 0
    case 'silenciar':
      return 0                        // 0
    default:
      return volumen
  }
}

export default function Reproductor() {
  // TODO 2: const [volumen, dispatch] = useReducer(volumenReducer, 5)
  const [volumen, dispatch] = useReducer(volumenReducer, 5)

  // TODO 4: cuenta renders con useRef + useEffect sin dependencias
  const rendersRef = useRef(0)

  useEffect(() => {
    rendersRef.current += 1
  })

  return (
    <section id="inicio" className="hero">
      <div className="hero-texto">
        <p className="hero-eyebrow">Escucha · Descubre · Repite</p>
        <h1>Tu música, <span className="script">nuestra pasión</span></h1>
        <p>Canciones y podcasts para estudiar, entrenar o simplemente dejarte llevar.</p>
        <a href="#catalogo" className="btn">Explorar catálogo →</a>
      </div>

      <div className="player">
        <div className="hero-vinilo" aria-hidden="true"><span>♪</span></div>
        <p className="player-sonando">Sonando ahora</p>
        <h2 className="player-titulo">Luna dorada</h2>
        <p className="player-artista">Valeria Ríos</p>

        <div className="volumen" aria-label={`Volumen ${volumen} de 10`}>
          {Array.from({ length: 10 }, (_, i) => (
            <span 
              key={i} 
              className={i < volumen ? 'barra on' : 'barra'} 
              style={{ height: `${8 + i * 2.4}px` }} 
            />
          ))}
        </div>
        <p className="volumen-num">Volumen {volumen}/10</p>

        {/* TODO 3: conecta los 3 botones con dispatch({ type: '...' }) */}
        <div className="acciones centrado">
          <button 
            type="button" 
            className="btn-redondo" 
            aria-label="Bajar volumen" 
            onClick={() => dispatch({ type: 'bajar' })}
          >
            －
          </button>
          <button 
            type="button" 
            className="btn-redondo" 
            aria-label="Silenciar" 
            onClick={() => dispatch({ type: 'silenciar' })}
          >
            🔇
          </button>
          <button 
            type="button" 
            className="btn-redondo principal" 
            aria-label="Subir volumen" 
            onClick={() => dispatch({ type: 'subir' })}
          >
            ＋
          </button>
        </div>
        <p className="nota">Renders del reproductor: {rendersRef.current}</p>
      </div>
    </section>
  )
}