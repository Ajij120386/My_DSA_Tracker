import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; 

      if (!text) return;

      // Split text by "$" to find math parts
      const parts = text.split('$');

      parts.forEach((part, index) => {
        // Even index = English Text, Odd index = Math
        if (index % 2 === 0) {
          // Handle **Bold** text inside English
          const boldSegments = part.split(/\*\*(.*?)\*\*/g);
          boldSegments.forEach((segment, bIndex) => {
            if (bIndex % 2 === 1) {
              const boldSpan = document.createElement('strong');
              boldSpan.innerText = segment;
              containerRef.current.appendChild(boldSpan);
            } else {
              containerRef.current.appendChild(document.createTextNode(segment));
            }
          });
        } else {
          // Render Math using KaTeX
          const mathSpan = document.createElement('span');
          try {
            katex.render(part, mathSpan, { throwOnError: false });
            containerRef.current.appendChild(mathSpan);
          } catch (e) {
            containerRef.current.appendChild(document.createTextNode('$' + part + '$'));
          }
        }
      });
    }
  }, [text]);

  return <span ref={containerRef} style={{ fontSize: '1.1em', color: '#333' }} />;
};

export default MathText;