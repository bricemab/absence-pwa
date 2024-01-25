import {ApplicationResponse} from "@/Types/GlobalType";
import RequestManager from "@/utils/RequestManager";
import config from "@/config/config";
import * as CryptoJS from "crypto-js";
import qs from "qs";
import {set} from "@vueuse/core";

export default {
  awaitTimeout: async (time: number) => {
    return new Promise(resolve => {setTimeout(resolve, time);})
  },
  isPwaInsalled: () => {
    // @ts-ignore
    return (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);
  },
  buildHmacSha256Signature(parameters: object) {
  const dataQueryString = qs.stringify(parameters); // .replace("%20", "+");
  return CryptoJS.HmacSHA256(
      dataQueryString,
      config.hmacSecretPacketKey
  ).toString(CryptoJS.enc.Hex);
},
  async postEncodedToBackend(
      url: string,
      params: object | FormData,
      config?: object,
      isUploadFile?: boolean
  ): Promise<ApplicationResponse<any>> {
    const token = this.buildHmacSha256Signature(params);
    if (isUploadFile) {
      return RequestManager.executePost(
          url,
          {
            token,
            params
          },
          config
      );
    } else {
      const data = {
        data: params,
        token
      };
      return RequestManager.executePost(url, data, config);
    }
  }
};