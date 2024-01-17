import {createStore} from "vuex";
import {Roles} from "@/permissions/roles";
import Utils from "@/utils/Utils";
import axios from "axios";
import {ApplicationDecryptedToken, UserDevicesStatus, UserSession} from "@/Types/GlobalType";
import {jwtDecode} from "jwt-decode";

interface UserStateType {
  userKey: string;
  deviceKey: string;
  role: Roles,
}

const userState: UserSession = {
  client: "",
  userKey: "",
  deviceKey: "",
  status: UserDevicesStatus.DEVICE_NOT_CONFIGURED,
  role: Roles.USER_ANONYMOUS
};

export default createStore({
  state: userState,
  getters: {
    isLoggedIn: (state: UserSession) => state.role !== Roles.USER_ANONYMOUS,
    getRole: (state: UserSession) => state.role,
    user: (state: UserSession) => state
  },
  mutations: {
    auth_success(state: UserSession, data: UserSession) {
      state.client = data.client;
      state.userKey = data.userKey;
      state.deviceKey = data.deviceKey;
      state.status = data.status;
      state.role = data.role;
    },
    auth_error(state: UserSession) {
      state.client = "";
      state.userKey = "";
      state.deviceKey = "";
      state.status = UserDevicesStatus.DEVICE_NOT_CONFIGURED;
      state.role = Roles.USER_ANONYMOUS;
    },
    logout(state: UserSession) {
      state.client = "";
      state.userKey = "";
      state.deviceKey = "";
      state.status = UserDevicesStatus.DEVICE_NOT_CONFIGURED;
      state.role = Roles.USER_ANONYMOUS;
    }
  },
  actions: {
    welcomeBack({ commit }: { commit: any }, token: string) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        if (token) {
          const tokenDecoded: ApplicationDecryptedToken =
              jwtDecode(token) || {};
          if (tokenDecoded.currentUser) {
            axios.defaults.headers.common["x-user-token"] = tokenDecoded.currentUser.userKey;
            axios.defaults.headers.common["x-device-token"] = tokenDecoded.currentUser.deviceKey;
            axios.defaults.headers.get["x-user-token"] = tokenDecoded.currentUser.userKey;
            axios.defaults.headers.get["x-device-token"] = tokenDecoded.currentUser.deviceKey;
            commit("auth_success", tokenDecoded.currentUser);
            resolve({
              success: true,
              data: tokenDecoded
            });
          } else {
            commit("auth_error");
            sessionStorage.removeItem("token");
            reject();
          }
        } else {
          commit("auth_error");
          sessionStorage.removeItem("token");
          reject();
        }
      });
    },
    register({ commit }: {commit: any}, data: {
      token: string,
      userSession: UserSession
    }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Utils.postEncodedToBackend("/users/register", data)
            .then((response) => {
              if (!response.success) {
                reject(response);
              }
              const { data } = response;
              const { token, userSession } = data;

              if (data && token) {
                const tokenDecoded: ApplicationDecryptedToken =
                    jwtDecode(token) || {};

                console.log(tokenDecoded)
                if (tokenDecoded.currentUser) {
                  axios.defaults.headers.common["x-user-token"] = tokenDecoded.currentUser.userKey;
                  axios.defaults.headers.common["x-device-token"] = tokenDecoded.currentUser.deviceKey;
                  axios.defaults.headers.get["x-user-token"] = tokenDecoded.currentUser.userKey;
                  axios.defaults.headers.get["x-device-token"] = tokenDecoded.currentUser.deviceKey;
                  localStorage.setItem("token", token);
                  commit("auth_success", tokenDecoded.currentUser);
                  resolve({
                    success: true,
                    data: tokenDecoded
                  });
                } else {
                  commit("auth_error");
                  localStorage.removeItem("token");
                  reject();
                }
              } else {
                commit("auth_error");
                localStorage.removeItem("token");
                reject();
              }
            })
            .catch(() => {
              commit("auth_error");
              localStorage.removeItem("token");
              reject();
            });
      });
    },
    logout({ commit }: { commit: any }) {
      return new Promise((resolve: any) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("isSidebarClose");
        delete axios.defaults.headers.common["x-user-token"];
        delete axios.defaults.headers.common["x-device-token"];
        resolve();
      });
    }
  },
  modules: {},
});
