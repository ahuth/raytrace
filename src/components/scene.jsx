import React from 'react';
import * as scene from '../scene';
import render from '../utils/render.js';

export default class Scene extends React.Component {
  canvasRef = React.createRef();
  planet1 = 0;
  planet2 = 0;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.pixelData = this.ctx.getImageData(0, 0, 320, 240);
    this.tick();
  }

  componentDidUpdate() {
    if (this.props.playing) {
      this.tick();
    }
  }

  tick = () => {
    // Straight-line distance covered. Note that planet2 orbits a bit faster.
    this.planet1 += 0.1;
    this.planet2 += 0.2;

    // Convet straight-line distance to orbital positions with some trigonometry.
    scene.objects[1].point.x = Math.sin(this.planet1) * 3.5;
    scene.objects[1].point.z = -3 + (Math.cos(this.planet1) * 3.5);

    scene.objects[2].point.x = Math.sin(this.planet2) * 4;
    scene.objects[2].point.z = -3 + (Math.cos(this.planet2) * 4);

    // Render everything.
    const nextPixelData = render(scene, 240, 320, this.pixelData);
    this.ctx.putImageData(nextPixelData, 0, 0);

    // Move the planets and render again.
    if (this.props.playing) {
      setTimeout(this.tick, 10);
    }
  }

  render() {
    return (
      <canvas
        height={240}
        ref={this.canvasRef}
        style={styles.canvas}
        width={320}
      />
    );
  }
}

const styles = {
  canvas: {
    height: 480,
    width: 640,
  },
};
