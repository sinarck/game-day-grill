import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

const useFetch = (endpoint: string) => {
  const [data, setData] = useState<AxiosResponse | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    axios
      .get(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setError(true)
        setErrorMessage(err)
      })
      .finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [endpoint])

  return { data, error, errorMessage, loading }
}

export default useFetch
