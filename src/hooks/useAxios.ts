import { authForm } from "@/types/auth"
import axios, { AxiosResponse } from "axios"
import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"

interface FetchProps {
  endpoint: string
  username: authForm["username"]
  password: authForm["password"]
}

const useAxios = <T = any>() => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(
    async ({ endpoint, password, username }: FetchProps) => {
      const controller = new AbortController()
      setLoading(true)
      setError(false)
      setErrorMessage(null)

      try {
        const res = await axios.post(
          endpoint,
          {
            username: username,
            password: password,
          },
          { signal: controller.signal }
        )

        setResponse(res)

        await signIn("credentials", {
          username: username,
          password: password,
          callbackUrl: "/",
          redirect: false,
        })
      } catch (err) {
        setError(true)
        setErrorMessage(err.response.data.message)
      } finally {
        setLoading(false)
      }

      return () => {
        console.log("Cleanup function testing")

        controller.abort()
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