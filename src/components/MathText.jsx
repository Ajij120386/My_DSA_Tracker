import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; 

      if (!text) return;

      // 1. Split by Triple Backticks (```) to find CODE BLOCKS
      // The 's' flag allows the dot (.) to match newlines
      const codeParts = text.split(/```(.*?)```/s);

      codeParts.forEach((part, index) => {
        
        // ODD Index = It was inside ``` ... ``` (So it is a CODE BLOCK)
        if (index % 2 === 1) {
          const pre = document.createElement('pre');
          pre.className = 'code-block'; // Styled in MCQExam.css
          pre.innerText = part.trim();  // Preserves indentation & newlines
          containerRef.current.appendChild(pre);
        } 
        
        // EVEN Index = Normal Text (Process Math, Inline Code, Bold)
        else {
          // 2. Split normal text by "$" for Math Formulas
          const mathParts = part.split('$');

          mathParts.forEach((mathSegment, mIndex) => {
            
            // ODD Index = Math ($...$)
            if (mIndex % 2 === 1) {
              const mathSpan = document.createElement('span');
              try {
                katex.render(mathSegment, mathSpan, { throwOnError: false });
                containerRef.current.appendChild(mathSpan);
              } catch (e) {
                // Fallback if math fails
                containerRef.current.appendChild(document.createTextNode('$' + mathSegment + '$'));
              }
            } 
            
            // EVEN Index = Text mixed with inline code/bold
            else {
              // 3. Split by single backtick (`) for Inline Code
              const inlineParts = mathSegment.split(/`(.*?)`/g);
              
              inlineParts.forEach((seg, iIndex) => {
                
                // ODD Index = Inline Code (`...`)
                if (iIndex % 2 === 1) {
                  const codeSpan = document.createElement('span');
                  codeSpan.className = 'inline-code'; // Styled in MCQExam.css
                  codeSpan.innerText = seg;
                  containerRef.current.appendChild(codeSpan);
                } 
                
                // EVEN Index = Process Bold (**)
                else {
                  const boldSegments = seg.split(/\*\*(.*?)\*\*/g);
                  
                  boldSegments.forEach((bSeg, bIndex) => {
                    // ODD Index = Bold (**...**)
                    if (bIndex % 2 === 1) {
                      const boldSpan = document.createElement('strong');
                      boldSpan.innerText = bSeg;
                      containerRef.current.appendChild(boldSpan);
                    } else {
                      // Finally, just plain text
                      containerRef.current.appendChild(document.createTextNode(bSeg));
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }, [text]);

  // Using a div instead of span to allow block elements (like <pre>) inside
  return <div ref={containerRef} style={{ fontSize: '1.1rem', color: '#374151', lineHeight: '1.6' }} />;
};

export default MathText;