import React, { useEffect, useRef, useState } from 'react'
import Confetti from "react-confetti";
function ConfettieEffect({widthEffect,heightEffect}) {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setHeight(widthEffect||window.innerHeight);
    setWidth(heightEffect||window.innerWidth);
  }, [widthEffect,heightEffect]);

  return (
    <div >
      <div >
        <Confetti numberOfPieces={150} width={width} height={height} />
      </div>
    </div>
  );
}

export default ConfettieEffect