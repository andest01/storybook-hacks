import React from "react";
import PropTypes from "prop-types";
import "./canvas.css";
import throttle from "raf-throttle";

const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

export const CanvasHooksComponent = ({ width, height, color }) => {
  let htmlCanvasRef = React.useRef();
  const draw = () => {
    let canvas = htmlCanvasRef.current;
    let context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle = color;
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      0,
      2 * Math.PI
    );
    context.fill();
  };
  React.useLayoutEffect(() => {
    let canvas = htmlCanvasRef.current;
    let context = canvas.getContext("2d");

    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    draw();
  }, [width, height]);

  React.useEffect(throttle(draw), [height, width, color]);
  return (
    <canvas
      style={{ width: `${width}px`, height: `${height}px` }}
      ref={htmlCanvasRef}
      className="storybook-canvas"
    />
  );
};

CanvasHooksComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
