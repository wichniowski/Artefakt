import React, { Component } from "react";

interface AnalyzerProps {
  canvasDimensions: {
    width: number;
    height: number;
  };
  audioContext: AudioContext;
  masterGain: GainNode;
}

class Analyzer extends Component<AnalyzerProps> {
  static defaultProps = {
    canvasDimensions: {
      width: document.body.clientWidth,
      height: 100
    }
  };

  analyser: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
  canvasContext!: CanvasRenderingContext2D;
  canvas: any;

  constructor(props: AnalyzerProps) {
    super(props);
    this.analyser = props.audioContext.createAnalyser();
    props.masterGain.connect(this.analyser);
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  componentDidMount() {
    this.canvasContext = this.canvas.getContext("2d");
    this.draw();
  }

  draw = () => {
    const { width, height } = this.props.canvasDimensions;
    requestAnimationFrame(this.draw);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.canvasContext.fillStyle = "rgb(0, 0, 0)";
    this.canvasContext.fillRect(0, 0, width, height);
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = "rgb(255, 255, 255)";
    this.canvasContext.beginPath();
    var sliceWidth = (width * 1.0) / this.bufferLength;
    var x = 0;
    for (var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = (v * height) / 2;

      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasContext.lineTo(width, height / 2);
    this.canvasContext.stroke();
  };

  render() {
    return (
      <canvas
        width={this.props.canvasDimensions.width}
        height={this.props.canvasDimensions.height}
        ref={ref => {
          this.canvas = ref;
        }}
      />
    );
  }
}

Analyzer.defaultProps = {
  canvasDimensions: {
    width: document.body.clientWidth,
    height: 100
  }
};

export default Analyzer;
