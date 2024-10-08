import { ErrorResponse, ReportDataParams } from "reportDataParams";

export interface PartialErrorResponse {
  error?: string;
}

export const isErrorResponse = (data: ReportDataParams | ErrorResponse): data is ErrorResponse => {
  return (data as ErrorResponse).error !== undefined;
};
