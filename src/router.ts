import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteMeta,
  RouteRecordRaw
} from "vue-router";
import HomeView from "./views/HomeView.vue";
import App from "@/App.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import NoLayout from "@/views/layouts/NoLayout.vue";
import RegisterPage from "@/views/pages/no-layout/RegisterPage.vue";
import {Permissions} from "@/permissions/permissions";
import NotFoundPage from "@/views/pages/no-layout/NotFoundPage.vue";
import IndexPage from "@/views/pages/layout/IndexPage.vue";
import AclManager from "@/permissions/AclManager";
import KeyRegisterPage from "@/views/pages/no-layout/KeyRegisterPage.vue";
import Utils from "@/utils/Utils";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/",
        component: DefaultLayout,
        children: [
          {
            path: "/",
            component: IndexPage,
            meta: {
              permission: Permissions.specialState.userLoggedIn
            }
          },
          {
            path: "redirect",
            name: "root",
            component: App,
            meta: {
              permission: Permissions.specialState.redirectToHome
            }
          },
        ]
      },
      {
        path: "register",
        component: NoLayout,
        children: [
          {
            path: "",
            component: RegisterPage,
            meta: {
              permission: Permissions.specialState.userLoggedOff
            }
          },
          {
            path: "key/:key",
            component: KeyRegisterPage,
            meta: {
              permission: Permissions.specialState.userLoggedOff
            }
          },
        ]
      },
      {
        path: "not-found",
        component: NotFoundPage,
        meta: {
          permission: Permissions.specialState.allowAll
        }
      },
      {
        path: "/:catchAll(.*)*",
        redirect: "/not-found"
      }
    ]
  },
];

const router = createRouter({
  linkActiveClass: "menu-active",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

interface MyPermissionRoute extends RouteMeta{
  permission: string;
}
interface MyRouteLocationNormalized extends RouteLocationNormalized {
  meta: MyPermissionRoute
}
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const myTo = to as MyRouteLocationNormalized;

  if (!(myTo.meta && myTo.meta.permission)) {
    throw new Error("NO META PERMISSION IN ROUTE");
  }
  const { isAllowed, redirectionRoute } = AclManager.hasUserAccessToPermission(
      myTo.meta.permission.toString()
  );
  console.log(Utils.isPwaInsalled())
  if (isAllowed) {
    next();
  } else {
    next(redirectionRoute || '');
  }
})

export default router;
