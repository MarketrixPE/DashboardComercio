import React, { ReactNode, useEffect, useState, CSSProperties, useRef } from 'react';
import 'animate.css';

interface AnimatedProps {
  children: ReactNode;
  animation?: string;
  duration?: string;
  delay?: string;
  repeat?: string | number;
  className?: string;
}

export const AnimatedCss: React.FC<AnimatedProps> = ({
  children,
  animation = 'fadeIn',
  duration = '1s',
  delay = '0.5s',
  repeat = '1',
  className = '',
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Solo activamos la animación si no se ha animado antes
            setIsInView(true);
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.01 // Cuando el 10% del elemento es visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  // Solo agregamos las clases de animación cuando el elemento está en vista
  const animationClass = isInView ? `animate__animated animate__${animation}` : '';
  
  const style: CSSProperties = {
    opacity: isInView ? 1 : 0, // Usamos opacity en lugar de visibility
    animationDuration: duration,
    animationDelay: delay,
    animationIterationCount: repeat as string,
    animationFillMode: 'both',
    // Agregamos una transición suave para la opacidad
    transition: 'opacity 0.1s ease-in-out'
  };

  return (
    <div 
      ref={elementRef}
      className={`${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedCss;