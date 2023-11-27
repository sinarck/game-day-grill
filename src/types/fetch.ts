import { FormAPIResponse } from "./auth"

// TODO: completely type this out
export interface FetchError {
  response: {
    data: {
      message: {
        user: FormAPIResponse
        message: FormAPIResponse
      }
    }
  }
}
