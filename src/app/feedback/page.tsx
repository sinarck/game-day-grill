"use client"

import { EmailTemplateProps } from "@/components/email-template"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import useAxios from "@/hooks/useAxios"
import { useCallback, useState } from "react"

const Page = () => {
  const { data, error, errorMessage, fetch, loading } = useAxios()
  const [fullName, setFullName] = useState("John Doe")
  const [feedback, setFeedback] = useState("")

  const sendEmail = useCallback(async () => {
    await fetch<EmailTemplateProps>({
      endpoint: "/api/feedback",
      method: "POST",
      body: {
        fullName: fullName,
        feedback: feedback,
      },
    })
  }, [fetch, fullName, feedback])

  return (
    <div className="p-28">
      {error && <p>{errorMessage}</p>}
      {data && (
        <h1 className="whitespace-nowrap text-center font-semibold tracking-wide">
          Thank you for your feedback!
        </h1>
      )}
      {!data && (
        <>
          <h1 className="whitespace-nowrap text-lg font-bold tracking-wide">
            Who is this from?
          </h1>
          <Textarea
            placeholder="Write you full name here"
            className="mb-3 h-1/3 resize-none"
            maxLength={50}
            onChange={(e) => setFullName(e.target.value)}
          />
          <h1 className="whitespace-nowrap text-lg font-bold tracking-wide">
            Feedback:
          </h1>
          <Textarea
            placeholder="Type your feedback here"
            className="mb-3 h-1/3 resize-none"
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button
            loading={loading}
            onClick={sendEmail}
            disabled={feedback === "" || fullName === ""}
          >
            Send feedback
          </Button>{" "}
        </>
      )}
    </div>
  )
}

export default Page
