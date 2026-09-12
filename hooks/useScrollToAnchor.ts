import { useRouter } from "next/router";
import { useEffect } from "react";
import { scroller } from "react-scroll";

const useScrollToAnchor = (siteHeaderHeight?: number) => {
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;

    let fragment: string | undefined = "";
    if (asPath.includes("#")) {
      fragment = asPath.split("#").pop()?.split("?")[0];
    }

    if (fragment) {
      const offsetHeight = siteHeaderHeight || 0;

      scroller.scrollTo(`scroll-to-${fragment}`, {
        offset: -offsetHeight,
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [router.asPath]);
};

export default useScrollToAnchor;
