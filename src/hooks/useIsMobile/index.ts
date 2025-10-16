
import {useState, useEffect} from "react";
import { useMediaQuery } from "./useMediaQuery";

function isOpera() {
    return navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR');
  }
// false pc / true mobile
export const useIsMobile = () => {
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isMobileQuery = useMediaQuery('(max-width:1024px)');
    useEffect(() => {
        setIsClient(true);
        const userAgent = navigator.userAgent || navigator.vendor;
        const mobileRegex = /android|bb\d+|meego|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
        if (mobileRegex.test(userAgent) || isOpera()) {
        setIsMobile(true);
        } else if (window.matchMedia('(pointer:coarse)').matches || isMobileQuery) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        }, [isMobileQuery])
    
    return isClient ? isMobile : false;
}