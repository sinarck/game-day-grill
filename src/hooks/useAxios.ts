import axios, { AxiosResponse } from "axios"
import { SignInResponse } from "next-auth/react"
import { useCallback, useState } from "react"

interface FetchProps {
  endpoint: string
  body: { username: string; password: string }
  callbackFunction: Promise<SignInResponse | undefined>
}

const useAxios = <T = any>() => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(
    async ({ endpoint, body, callbackFunction }: FetchProps) => {
      const controller = new AbortController()
      setLoading(true)
      setError(false)
      setErrorMessage(null)

      try {
        const res = await axios.post(endpoint, body, {
          signal: controller.signal,
        })

        setResponse(res)

        await callbackFunction
      } catch (err) {
        setError(true)
        setErrorMessage(err.response.data.message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    fetch: fetch,
    data: response,
    error,
    errorMessage,
    loading,
  }
}

export default useAxios
