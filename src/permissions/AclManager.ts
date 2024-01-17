import store from "@/store";
import {Permissions} from "@/permissions/permissions";
import {RolesAllowedPermissions} from "@/permissions/rolesPermissions";

export default class AclManager {
	public static hasUserAccessToPermission(routeRequiredPermission: string): {
		isAllowed: boolean;
		redirectionRoute: string | undefined;
	} {
		let hasPermission = false;
		let redirectionRoute: string | undefined = "";
		const userRole: string = store.getters.getRole;

		//Les routes spéciales sont gérées à part
		if (
			routeRequiredPermission &&
			routeRequiredPermission.includes("specialState.")
		) {
			switch (routeRequiredPermission) {
				case Permissions.specialState.redirectToHome:
					hasPermission = false;
					redirectionRoute = "/";
					break;
				case Permissions.specialState.allowAll:
					hasPermission = true;
					break;
				case Permissions.specialState.userLoggedIn:
					if (store.getters.isLoggedIn) {
						hasPermission = true;
					} else {
						redirectionRoute = "/register";
					}
					break;
				case Permissions.specialState.userLoggedOff:
					if (!store.getters.isLoggedIn) {
						hasPermission = true;
					} else {
						redirectionRoute = "/redirect";
					}
					break;
				default:
					Error("Unkwown special permission, please specify it");
			}
		} else {
			//Toutes les permissions
			if (
				Object.prototype.hasOwnProperty.call(RolesAllowedPermissions, userRole)
			) {
				const userPermissions: (string | object)[] =
					// @ts-ignore
					RolesAllowedPermissions[userRole];

				userPermissions.forEach((userPermission) => {
					if (typeof userPermission === "object") {
						if (
							Object.values(userPermission).includes(routeRequiredPermission)
						) {
							hasPermission = true;
						}
					} else {
						if (userPermission === routeRequiredPermission) {
							hasPermission = true;
						}
					}
				});
			} else {
				Error("This role must be declared in permissions");
			}
		}

		return {
			isAllowed: hasPermission,
			redirectionRoute
		};
	}
}