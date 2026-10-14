import { Spinner, MensajeError } from '../components/Estados.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { URL_ARTISTAS } from '../services/api.js'

// =====================================================================
// PASO 5 · Consume tu hook useFetch (la lógica va en hooks/useFetch.js)
// =====================================================================
// Este componente ya está listo. Cuando completes useFetch,
// aparecerán los artistas y funcionará el botón "Actualizar".

const ROLES = ['Cantautora', 'Productor', 'Podcaster', 'DJ', 'Banda indie']

export default function Artistas() {
  const { data, loading, error, refetch } = useFetch(URL_ARTISTAS)
  const artistas = Array.isArray(data) ? data.slice(0, 8) : []

  return (
    <section id="artistas" className="seccion">
      <div className="seccion-cabecera">
        <div>
          <p className="script-titulo">Los más escuchados</p>
          <h2>Artistas y podcasters destacados</h2>
        </div>
        <button type="button" className="btn btn-sec" onClick={refetch}>↻ Actualizar</button>
      </div>

      {loading && <Spinner texto="Cargando artistas..." />}
      {!loading && error && <MensajeError mensaje={error} onReintentar={refetch} />}
      {!loading && !error && artistas.length === 0 && (
        <p className="vacio">Los artistas aparecerán cuando completes el hook useFetch.</p>
      )}
      {!loading && artistas.length > 0 && (
        <div className="grid-artistas">
          {artistas.map((a) => (
            <article key={a.id} className="artista">
              <div className="artista-avatar" aria-hidden="true">
                {a.name.split(' ').slice(0, 2).map((p) => p[0]).join('')}
              </div>
              <h3>{a.name}</h3>
              <p>{ROLES[a.id % ROLES.length]} · {a.address?.city}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
