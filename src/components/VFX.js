import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import p5 from "p5";

const sketch = (p, context, masterGain, aux) => {
  let rotation = 0;

  console.log(context);

  let colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];
  let analyserNode = undefined;

  p.setup = function() {
    p.createCanvas(600, 400);

    analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;
    aux.connect(analyserNode);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.rotation) {
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function() {
    p.background(colorPalette[0]);

    const bufferLength = analyserNode.frequencyBinCount;
    console.log(analyserNode);
    const dataArray = new Uint8Array(bufferLength);

    console.log(analyserNode.getFloatFrequencyData(dataArray));

    p.noFill();

    // console.log(analyserNode.getFloatFrequencyData(dataArray));

    // var bass = fft.getEnergy("bass");
    // var treble = fft.getEnergy("treble");
    // var mid = fft.getEnergy("mid");

    // p.translate(p.windowWidth / 2, p.windowHeight / 2);

    // p.strokeWeight(1);

    // const radius = 1000;

    // for (let i = 0; i < 100; i += 0.5) {
    //   p.rotate(p.TWO_PI / 100);

    //   /*----------  BASS  ----------*/
    //   p.push();
    //   p.strokeWeight(5);
    //   p.stroke(colorPalette[1]);
    //   p.scale(scalebass);
    //   p.rotate(p.frameCount * -0.5);
    //   p.line(mapbass, radius / 2, radius, radius);
    //   p.line(-mapbass, -radius / 2, radius, radius);
    //   p.pop();

    //   /*----------  MID  ----------*/
    //   push();
    //   strokeWeight(0.5);
    //   stroke(colorPalette[2]);
    //   scale(scaleMid);
    //   line(mapMid, radius / 2, radius, radius);
    //   line(-mapMid, -radius / 2, radius, radius);
    //   pop();

    //   /*----------  TREMBLE  ----------*/
    //   push();
    //   stroke(colorPalette[3]);
    //   scale(scaleTreble);
    //   line(mapTreble, radius / 2, radius, radius);
    //   line(-mapTreble, -radius / 2, radius, radius);
    //   pop();
    // }
  };
};

class VFX extends Component {
  render() {
    return (
      <P5Wrapper
        sketch={p =>
          sketch(p, this.props.context, this.props.masterGain, this.props.aux)
        }
      />
    );
  }
}

export default VFX;
