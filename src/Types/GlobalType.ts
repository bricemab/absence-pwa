import {
  AuthenticationErrors,
  GeneralErrors,
  UserErrors
} from "@/Types/BackendErrors";
import {Roles} from "@/permissions/roles";
import {Dayjs} from "dayjs";

export type ApplicationReject = (error: ApplicationError) => void;

export enum UserDevicesStatus {
  DEVICE_ENABLED = "DEVICE_ENABLED",
  DEVICE_CONFIGURATION = "DEVICE_CONFIGURATION",
  DEVICE_NOT_CONFIGURED = "DEVICE_NOT_CONFIGURED",
  DEVICE_DELETE_BY_USER = "DEVICE_DELETE_BY_USER"
}


export interface UserSession {
  client: string,
  userKey: string,
  deviceKey: string,
  status: UserDevicesStatus,
  role: Roles
}
export interface ApplicationResponse<DataType> {
  success: boolean;
  data?: DataType;
  error?: ApplicationError;
}

export enum ClientErrors {
  AXIOS_NO_RESPONSE = "AXIOS_NO_RESPONSE",
  BACKEND_ERROR = "BACKEND_ERROR",
  BACKEND_NOT_RESPONDING = "BACKEND_NOT_RESPONDING",
  BACKEND_GENERAL_ERROR = "BACKEND_GENERAL_ERROR",
  PROXY_UNKNOWN_ERROR = "PROXY_UNKNOWN_ERROR",
}

export type ApplicationErrorType =
  | ClientErrors
  | GeneralErrors
  | UserErrors
  | AuthenticationErrors;

export interface ApplicationError {
  code: ApplicationErrorType;
  message: string;
  details?: any;
}

export interface ApplicationDecryptedToken {
  currentUser: UserSession;
  token: string;
}