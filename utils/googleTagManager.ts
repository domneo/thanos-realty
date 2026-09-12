import { useRouter } from "next/router";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const pageview = (url: URL) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};

interface GoogleTagManagerProps {
  children: JSX.Element;
}

const GoogleTagManager = ({ children }: GoogleTagManagerProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return children;
};

export default GoogleTagManager;
