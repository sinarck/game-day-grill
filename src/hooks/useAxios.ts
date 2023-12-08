import { ToastProps } from "@/components/ui/toast"
import axios, { AxiosResponse } from "axios"
import { SignInResponse } from "next-auth/react"
import { useState } from "react"

interface FetchProps<T> {
  endpoint: string
  body: T
  callbackFunction?: Promise<
    | SignInResponse
    | { id: string; dismiss: () => void; update: (props: ToastProps) => void }
    | undefined
  >
}

const useAxios = <T = any>() => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = async <K>({
    endpoint,
    body,
    callbackFunction,
  }: FetchProps<K>) => {
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    setErrorMessage(null)

    try {
      const res = await axios.post(endpoint, body, {
        signal: controller.signal,
      })

      setResponse(res)

      if (callbackFunction) {
        await callbackFunction
      }
    } catch (err) {
      setError(true)
      setErrorMessage(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    fetch: fetch,
    data: response,
    error,
    errorMessage,
    loading,
  }
}

export default useAxios
