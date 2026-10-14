import { useState, useEffect } from 'react'
import SongCard from '../components/SongCard.jsx'
import { Spinner, MensajeError } from '../components/Estados.jsx'
// eslint-disable-next-line no-unused-vars
import { URL_CANCIONES, URL_EXITO, URL_ERROR_404, albumACancion } from '../services/api.js'

export default function Novedades() {
  // TODO 1: estados → url (null), data (null), loading (false), error (null)
  const [url, setUrl] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TODO 2: useEffect con dependencias [url]
  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    
    const cargar = async () => {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const response = await fetch(url, { signal: controller.signal })
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} (No se pudo conectar al servidor)`)
        }

        const resultado = await response.json()

        // Si url === URL_CANCIONES, mapea la respuesta con albumACancion
        if (url === URL_CANCIONES) {
          const cancionesMapeadas = resultado.map(albumACancion)
          setData(cancionesMapeadas)
        } else {
          setData(resultado)
        }
      } catch (err) {
        // Si err.name === 'AbortError' no hacer nada
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    cargar()

    // cleanup: cancela la petición si la url cambia o el componente se desmonnta
    return () => controller.abort()
  }, [url])

  const esLista = Array.isArray(data)

  return (
    <section id="novedades" className="seccion">
      <div className="seccion-cabecera">
        <div>
          <p className="script-titulo">Recién llegadas</p>
          <h2>Novedades de la semana</h2>
        </div>
        {/* TODO 3: botones → setUrl(...) / limpiar */}
        <div className="acciones">
          <button type="button" className="btn" onClick={() => setUrl(URL_CANCIONES)}>🎵 Cargar novedades</button>
          <button type="button" className="btn btn-ok" onClick={() => setUrl(URL_EXITO)}>✓ Probar conexión</button>
          <button type="button" className="btn btn-error" onClick={() => setUrl(URL_ERROR_404)}>✗ Probar error 404</button>
          <button type="button" className="btn btn-sec" onClick={() => { setUrl(null); setData(null); setError(null); setLoading(false); }}>Limpiar</button>
        </div>
      </div>

      {!loading && !data && !error && (
        <p className="vacio">Pulsa “Cargar novedades” para ver los últimos lanzamientos.</p>
      )}
      {loading && <Spinner texto="Buscando lanzamientos..." />}
      {!loading && error && <MensajeError mensaje={error} />}
      {!loading && esLista && (
        <div className="grid-canciones">
          {data.map((c) => <SongCard key={c.id} cancion={c} />)}
        </div>
      )}
      {!loading && data && !esLista && (
        <p className="alerta alerta-ok">Conexión correcta: el servidor respondió “{data.message}”.</p>
      )}
    </section>
  )
}