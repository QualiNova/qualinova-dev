import { useState, useEffect } from 'react';

const useMobile = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, [breakpoint]);

    return isMobile;
};

export default useMobile;
