// Componentes de estado reutilizables

export function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="spinner" role="status">
      <span className="spinner-onda" aria-hidden="true"><i /><i /><i /><i /></span>
      {texto}
    </div>
  )
}

export function MensajeError({ mensaje, onReintentar }) {
  return (
    <div className="alerta alerta-error" role="alert">
      <span><strong>No pudimos cargar la música.</strong> {mensaje}</span>
      {onReintentar && <button type="button" className="btn btn-sec" onClick={onReintentar}>Reintentar</button>}
    </div>
  )
}
