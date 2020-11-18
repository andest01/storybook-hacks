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

export class CanvasClassComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.html5CanvasRef = React.createRef();
    this.throttledDraw = throttle(this.draw.bind(this));
  }

  componentDidMount() {
    this.updateCanvas(this.props);
    this.draw(this.props);
  }

  updateCanvas({ width, height }) {
    let canvas = this.html5CanvasRef.current;
    let context = canvas.getContext("2d");

    let ratio = getPixelRatio(context);
    let canvasWidth = getComputedStyle(canvas)
      .getPropertyValue("width")
      .slice(0, -2);
    let canvasHeight = getComputedStyle(canvas)
      .getPropertyValue("height")
      .slice(0, -2);

    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    this.draw(this.props);
  }

  draw({ color }) {
    console.log("draw");
    let canvas = this.html5CanvasRef.current;
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
  }

  componentDidUpdate(prevProps) {
    this.draw(this.props);
  }
  render() {
    const { width, height, color } = this.props;
    return (
      <canvas
        style={{ width: `${width}px`, height: `${height}px` }}
        ref={this.html5CanvasRef}
        className="storybook-canvas"
      />
    );
  }
}

CanvasClassComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
