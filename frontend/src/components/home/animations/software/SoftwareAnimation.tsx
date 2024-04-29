import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const SoftwareAnimation = () => {
  const el = useRef(null);
  console.log(Typed);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: [
          'console.log("Hello World!");',
          'print("Hola Mundo")',
          'System.out.println("Hallo Welt");',
          'printf("Bonjour le monde\\n");',
        ],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });

      return () => typed.destroy();
    }
  }, []);

  return (
    <div className="text-white font-mono text-lg p-4">
      <span ref={el} />
    </div>
  );
};

export default SoftwareAnimation;
