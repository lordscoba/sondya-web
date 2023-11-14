import { ReduxResponseType } from "./types/general.types";

export const initialState: ReduxResponseType = {
  loading: false,
  success: false,
  serverResponse: {
    data: [],
    message: "",
    success: false,
  },
  error: "",
  testimonial: {
    success: false,
    loading: false,
    error: "",
    serverResponse: {},
  },
};
