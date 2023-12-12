import { ToastProps } from "@/components/ui/toast"
import axios, { AxiosResponse } from "axios"
import { SignInResponse } from "next-auth/react"
import { useCallback, useState } from "react"

export const runtime = "edge"

interface FetchProps<T> {
  endpoint: string
  body: T
  callbackFunction?: () => Promise<
    | SignInResponse
    | { id: string; dismiss: () => void; update: (props: ToastProps) => void }
    | undefined
  >
  method: "POST" | "GET"
}

const useAxios = <T = any>() => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(
    async <K>({ endpoint, body, callbackFunction, method }: FetchProps<K>) => {
      const controller = new AbortController()
      setLoading(true)
      setError(false)
      setErrorMessage(null)

      const makeRequest = async () => {
        if (method === "POST") {
          return await axios.post(endpoint, body, {
            signal: controller.signal,
          })
        } else {
          return await axios.get(endpoint, {
            signal: controller.signal,
          })
        }
      }

      try {
        for (let i = 0; i < 3; i++) {
          try {
            const res = await makeRequest()

            setResponse(res)
            if (callbackFunction) {
              callbackFunction()
            }
            break
          } catch (err) {
            if (i === 2) {
              setError(true)
              setErrorMessage(err.response.data.message)
            } else {
              console.warn(
                "[Data Fetching] Request failed, retrying request..."
              )
            }
          }
        }
      } finally {
        setLoading(false)
      }
    },
    [setResponse, setError, setErrorMessage, setLoading]
  )

  return {
    fetch,
    data: response,
    error,
    errorMessage,
    loading,
  }
}

export default useAxios
