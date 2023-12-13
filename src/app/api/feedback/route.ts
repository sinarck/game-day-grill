import { EmailTemplate, EmailTemplateProps } from "@/components/email-template"
import { APIError, FeedbackAPIResponse } from "@/types/api"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const MAX_REQUESTS_PER_DAY = 1
const requests = new Map<string, number>()

export function rateLimit(
  request: NextRequest,
  next: (request: NextRequest) => Promise<NextResponse>
) {
  const headersLists = headers()
  let ip = headersLists.get("x-forwarded-for")

  if (ip) {
    // Use the first IP address in the x-forwarded-for header
    ip = ip.split(",")[0].trim()
  }

  console.log(request)

  if (!ip) {
    return NextResponse.json<APIError<FeedbackAPIResponse>>(
      {
        feedback: null,
        message: "IP address is undefined",
      },
      {
        status: 400,
      }
    )
  }

  const requestsMade = requests.get(ip) ?? 0

  if (requestsMade >= MAX_REQUESTS_PER_DAY) {
    return NextResponse.json<APIError<FeedbackAPIResponse>>(
      {
        feedback: null,
        message: "Rate limit exceeded",
      },
      {
        status: 429,
      }
    )
  }

  requests.set(ip, requestsMade + 1)

  return next(request)
}

export async function POST(request: NextRequest) {
  return rateLimit(request, async (request) => {
    try {
      const body = await request.json()
      const { fullName, feedback } = body as EmailTemplateProps

      const data = await resend.emails.send({
        from: "Feedback <onboarding@resend.dev>",
        to: "moi6ly12@duck.com",
        subject: "Feedback Received",
        react: EmailTemplate({
          fullName: fullName,
          feedback,
        }),
      })

      return NextResponse.json<FeedbackAPIResponse>(
        {
          feedback: data,
          message: "Feedback sent successfully",
        },
        {
          status: 200,
        }
      )
    } catch (e) {
      console.error(e)

      return NextResponse.json<APIError<FeedbackAPIResponse>>(
        {
          feedback: null,
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      )
    }
  })
}
