import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  highlightColor?: string;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  words, 
  highlightColor = "#3944EB", 
  className = "" 
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Efecto para el cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      // Si está borrando, reduce la longitud del texto
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(50); // Borrar más rápido
      } else {
        // Si está escribiendo, aumenta la longitud del texto
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(150); // Escribir a velocidad normal
      }

      // Si ya terminó de escribir y no está borrando aún
      if (!isDeleting && text === currentWord) {
        // Espera un momento antes de comenzar a borrar
        setTimeout(() => setIsDeleting(true), 1500);
        setTypingSpeed(100);
      } 
      // Si ya terminó de borrar
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        // Pasa a la siguiente palabra
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <span className={`typewriter-container ${className}`}>
      <span 
        className="typewriter active font-semibold" 
        style={{ 
          color: highlightColor,
          position: 'relative',
          display: 'inline-block'
        }}
      >
        {text}
        <span 
          style={{ 
            opacity: cursorVisible ? 1 : 0,
            marginLeft: '1px',
            borderRight: `2px solid ${highlightColor}`,
            height: '100%',
            display: 'inline-block'
          }}
        ></span>
      </span>
    </span>
  );
};

export default TypeWriter;