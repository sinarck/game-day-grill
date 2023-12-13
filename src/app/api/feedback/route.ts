import { EmailTemplate, EmailTemplateProps } from "@/components/email-template"
import { APIError, FeedbackAPIResponse } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, feedback } = body as EmailTemplateProps

    const data = await resend.emails.send({
      from: "Feedback <onboarding@resend.dev>",
      to: "moi6ly12@duck.com",
      subject: "Feedback Received",
      react: EmailTemplate({ fullName: fullName, feedback }),
    })

    return NextResponse.json<FeedbackAPIResponse>({
      feedback: data,
      message: "Feedback sent successfully",
    })
  } catch (e) {
    console.error(e)

    return NextResponse.json<APIError<FeedbackAPIResponse>>({
      feedback: null,
      message: "Something went wrong",
    })
  }
}
