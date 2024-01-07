export enum Roles {
  USER_ADMIN = "USER_ADMIN", // admin de l'api
  USER_ANONYMOUS = "USER_ANONYMOUS", // random sans perms
  USER_SCANNER = "USER_SCANNER", // user qui a un qr code sur son telephone
  USER_API_CLIENT = "USER_API_CLIENT" // user qui permet de recuperer les donnes sur l'api
}
