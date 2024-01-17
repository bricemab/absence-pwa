import {Permissions} from "@/permissions/permissions";


export const RolesAllowedPermissions = {
  USER_ADMIN: [
      Permissions.qrCodeManager
  ],
  USER_APP: [
    Permissions.qrCodeManager.refresh
  ],
  USER_ANONYMOUS: [],
}
