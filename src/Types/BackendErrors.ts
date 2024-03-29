export enum GeneralErrors {
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
  OBJECT_NOT_FOUND_IN_DATABASE = "OBJECT_NOT_FOUND_IN_DATABASE",
  ALREADY_EXIST = "ALREADY_EXIST",
}

export enum UserErrors {
  LOGIN_ALREADY_EXIST = "LOGIN_ALREADY_EXIST",
  KEY_NO_MATCH = "KEY_NO_MATCH"
}

export enum AuthenticationErrors {
  AUTH_TOKEN_EXPIRED = "AUTH_TOKEN_EXPIRED",
  AUTH_BLOCKED = "AUTH_BLOCKED",
  AUTH_MUST_BE_LOGGED_OFF = "AUTH_MUST_BE_LOGGED_OFF",
  AUTH_NO_TOKEN_PROVIDED = "AUTH_NO_TOKEN_PROVIDED",
  AUTH_TOKEN_IS_NOT_AUTHENTIC = "AUTH_TOKEN_IS_NOT_AUTHENTIC",
  AUTH_INVALID_CREDENTIALS = "AUTH_INVALID_CREDENTIALS",
  AUTH_NO_ROLE_ALLOWED = "AUTH_NO_ROLE_ALLOWED",
  AUTH_ACCESS_TO_INTRANET_NOT_ALLOWED = "AUTH_ACCESS_TO_INTRANET_NOT_ALLOWED",
  AUTH_DISABLED_ACCOUNT = "AUTH_DISABLED_ACCOUNT",
  ACCESS_NOT_AUTHORIZED = "ACCESS_NOT_AUTHORIZED",
}
