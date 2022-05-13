import "./styles.css";
import React, { useEffect, useRef, useState } from "react";

const getCurrentFrame = (index) => {
  return `https://raw.githubusercontent.com/paakdegito/hosted-assets/main/Coke_Model/anim_0001.png9546908C-C1B0-48AD-93EC-367C873308D3DefaultHQ-${index
    .toString()
    .padStart(0, "0")}.jpg`;
};

const ImageCanvas = ({ scrollHeight, numFrames, width, height }) => {
  const canvasRef = useRef(null);
  const [isShow, setIsShow] = useState(0);
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);

  const preloadImages = () => {
    for (let i = 1; i <= numFrames; i++) {
      const img = new Image();
      const imgSrc = getCurrentFrame(i);
      img.src = imgSrc;
      setImages((prevImages) => [...prevImages, img]);
    }
  };

  const handleScroll = () => {
    const scrollFraction = window.scrollY / (scrollHeight - window.innerHeight);
    const index = Math.min(
      numFrames - 1,
      Math.ceil(scrollFraction * numFrames)
    );
    if (index <= 0 || index > numFrames) {
      return;
    }
    setFrameIndex(index);

    if (index > 35) {
      setIsShow(2);
    } else if (index >= 15) {
      setIsShow(1);
    } else if (index >= 1) {
      setIsShow(0);
    }
  };

  const renderCanvas = () => {
    const context = canvasRef.current.getContext("2d");
    context.canvas.width = width;
    context.canvas.height = height;
  };

  useEffect(() => {
    preloadImages();
    renderCanvas();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length < 1) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    let requestId;
    const render = () => {
      context.drawImage(images[frameIndex], 0, 0);
      requestId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images, isShow]);

  return (
    <div className="body" style={{ height: scrollHeight }}>
      <h1 className={`textTransition ${isShow === 0 ? "show" : ""}`}>
        Coca - cola
      </h1>
      <h1 className={`textTransition ${isShow === 1 ? "show" : ""}`}>Coca</h1>
      <h1 className={`textTransition ${isShow === 2 ? "show" : ""}`}> </h1>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default function App() {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <ImageCanvas
          scrollHeight={2960}
          width={1480}
          height={800}
          numFrames={35}
        />
      </div>
      <div style={{ backgroundColor: "red" }}>
        <h1>Cras tincidunt lobortis</h1>
        <p>
          Gravida quis blandit turpis cursus in. Tellus in metus vulputate eu
          scelerisque felis. Sed vulputate mi sit amet mauris. Iaculis urna id
          volutpat lacus laoreet. Duis tristique sollicitudin nibh sit. Dui
          vivamus arcu felis bibendum ut tristique. Morbi tincidunt augue
          interdum velit. Diam phasellus vestibulum lorem sed risus ultricies
          tristique. Varius duis at consectetur lorem donec. Massa sed elementum
          tempus egestas sed. Tortor condimentum lacinia quis vel eros donec ac
          odio tempor. Amet mattis vulputate enim nulla aliquet porttitor lacus
          luctus. Nunc aliquet bibendum enim facilisis. Volutpat sed cras ornare
          arcu dui vivamus arcu. Faucibus a pellentesque sit amet. Senectus et
          netus et malesuada fames ac turpis egestas integer. Bibendum at varius
          vel pharetra vel. Non enim praesent elementum facilisis leo. Pharetra
          diam sit amet nisl suscipit. Egestas erat imperdiet sed euismod.
        </p>
        <p>
          Gravida quis blandit turpis cursus in. Tellus in metus vulputate eu
          scelerisque felis. Sed vulputate mi sit amet mauris. Iaculis urna id
          volutpat lacus laoreet. Duis tristique sollicitudin nibh sit. Dui
          vivamus arcu felis bibendum ut tristique. Morbi tincidunt augue
          interdum velit. Diam phasellus vestibulum lorem sed risus ultricies
          tristique. Varius duis at consectetur lorem donec. Massa sed elementum
          tempus egestas sed. Tortor condimentum lacinia quis vel eros donec ac
          odio tempor. Amet mattis vulputate enim nulla aliquet porttitor lacus
          luctus. Nunc aliquet bibendum enim facilisis. Volutpat sed cras ornare
          arcu dui vivamus arcu. Faucibus a pellentesque sit amet. Senectus et
          netus et malesuada fames ac turpis egestas integer. Bibendum at varius
          vel pharetra vel. Non enim praesent elementum facilisis leo. Pharetra
          diam sit amet nisl suscipit. Egestas erat imperdiet sed euismod.
        </p>
        <p>
          Gravida quis blandit turpis cursus in. Tellus in metus vulputate eu
          scelerisque felis. Sed vulputate mi sit amet mauris. Iaculis urna id
          volutpat lacus laoreet. Duis tristique sollicitudin nibh sit. Dui
          vivamus arcu felis bibendum ut tristique. Morbi tincidunt augue
          interdum velit. Diam phasellus vestibulum lorem sed risus ultricies
          tristique. Varius duis at consectetur lorem donec. Massa sed elementum
          tempus egestas sed. Tortor condimentum lacinia quis vel eros donec ac
          odio tempor. Amet mattis vulputate enim nulla aliquet porttitor lacus
          luctus. Nunc aliquet bibendum enim facilisis. Volutpat sed cras ornare
          arcu dui vivamus arcu. Faucibus a pellentesque sit amet. Senectus et
          netus et malesuada fames ac turpis egestas integer. Bibendum at varius
          vel pharetra vel. Non enim praesent elementum facilisis leo. Pharetra
          diam sit amet nisl suscipit. Egestas erat imperdiet sed euismod.
        </p>
      </div>
    </>
  );
}
