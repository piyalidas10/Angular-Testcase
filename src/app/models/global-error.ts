import { HttpErrorResponse } from "@angular/common/http";

export class GlobalError {
    errorType: ErrorType;
    errorObj?: Error | HttpErrorResponse;
    errorStatus?: number;
    errorMsg: string
}

export interface GlobalErrorType {
    errorType: ErrorType;
    errorObj?: Error | HttpErrorResponse;
    errorStatus?: number;
    errorMsg: string
}

export enum ErrorType {
    UI = 'UIError',
    SERVER = 'ServerError'
}