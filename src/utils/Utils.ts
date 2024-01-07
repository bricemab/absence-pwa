export default {
  isPwaInsalled: () => {
    // @ts-ignore
    return (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);
  }
};