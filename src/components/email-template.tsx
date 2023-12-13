export interface EmailTemplateProps {
  fullName: string
  feedback: string
}

export const EmailTemplate = ({ fullName, feedback }: EmailTemplateProps) => (
  <div>
    <h1>Message from: {fullName}!</h1>
    <h2>Feedback:</h2>
    <p>{feedback}</p>
  </div>
)
