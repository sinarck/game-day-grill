import { ToastProps } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
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
  const { toast } = useToast()

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

    for (let i = 0; i < 3; i++) {
      // Retry up to 3 times
      try {
        const res = await axios.post(endpoint, body, {
          signal: controller.signal,
        })

        setResponse(res)

        if (callbackFunction) {
          await callbackFunction
        }

        // If the request was successful, break the loop
        break
      } catch (err) {
        // If this was the last retry, throw the error
        if (i === 2) {
          setError(true)
          setErrorMessage(err.response.data.message)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
        }
      } finally {
        setLoading(false)
      }
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
