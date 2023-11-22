import { Response } from "./auth"

// TODO: completely type this out
export interface FetchError {
  response: {
    data: {
      message: {
        user: Response
        message: Response
      }
    }
  }
}
