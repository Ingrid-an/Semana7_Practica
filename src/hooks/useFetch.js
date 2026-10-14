import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  // TODO 1: tres estados -> data (null), loading (true), error (null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO 2: un estado "recarga" (número) que refetch incremente.
  const [recarga, setRecarga] = useState(0)

  const refetch = useCallback(() => {
    setRecarga((n) => n + 1)
  }, [])

  // TODO 3: useEffect con AbortController, try/catch/finally y dependencias [url, recarga]
  useEffect(() => {
    if (!url) {
      setLoading(false)
      setData(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`)
        }

        const json = await res.json()
        if (!controller.signal.aborted) {
          setData(json)
        }
      } catch (err) {
        // en catch: ignorar err.name === 'AbortError'
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        // en finally: setLoading(false) solo si no se abortó
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // cleanup: cancela la petición si cambia la url o recarga
    return () => {
      controller.abort()
    }
  }, [url, recarga])

  return { data, loading, error, refetch }
}