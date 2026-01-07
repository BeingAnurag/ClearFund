'use client';

import { useEffect, useState, useRef } from 'react';

export const CountUp = ({ 
    end, 
    duration = 2000, 
    prefix = '', 
    suffix = '', 
    decimals = 0 
}: { 
    end: number; 
    duration?: number; 
    prefix?: string; 
    suffix?: string; 
    decimals?: number; 
}) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    
                    let startTimestamp: number | null = null;
                    
                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        
                        setCount(easeProgress * end);
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <span ref={elementRef} className="tabular-nums">
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
};
