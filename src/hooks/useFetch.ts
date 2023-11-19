import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Response, enrollForm } from "@/types/auth"
import { useRouter } from "next/router"

interface FetchProps {
  endpoint: string
  username: enrollForm["username"]
  password: enrollForm["password"]
}

const useFetch = <T = any>() => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetch = async ({ endpoint, password, username }: FetchProps) => {
    const controller = new AbortController()
    setLoading(true)

    axios
      .post(
        endpoint,
        {
          username: username,
          password: password,
        },
        { signal: controller.signal }
      )
      .then((res) => {
        console.log(res.data)
        setResponse(res)
      })
      .catch((err) => {
        setError(true)
        setErrorMessage(err)
      })
      .finally(() => setLoading(false))
  }

  return { fetch, data: response, error, errorMessage, loading }
}

export default useFetch
