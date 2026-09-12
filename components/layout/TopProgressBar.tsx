import router from "next/router";
import NProgress from "nprogress";

let timer: ReturnType<typeof setTimeout>;
let state: string;
let activeRequests = 0;
const delay = 250;
NProgress.configure({ showSpinner: false });

const load = () => {
  if (state === "loading") {
    return;
  }

  state = "loading";

  timer = setTimeout(() => {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
};

const stop = () => {
  if (activeRequests > 0) {
    return;
  }

  state = "stop";

  clearTimeout(timer);
  NProgress.done();
};

router.events.on("routeChangeStart", load);
router.events.on("routeChangeComplete", stop);
router.events.on("routeChangeError", stop);

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  if (activeRequests === 0) {
    load();
  }

  activeRequests++;

  try {
    const response = await originalFetch(...args);
    return response;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    activeRequests -= 1;
    if (activeRequests === 0) {
      stop();
    }
  }
};

const TopProgressBar = () => null;

export default TopProgressBar;
