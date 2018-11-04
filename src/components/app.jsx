import React from 'react';
import * as scene from '../scene';
import render from '../utils/render';

export default class App extends React.Component {
  canvasRef = React.createRef();
  playing = false;
  planet1 = 0;
  planet2 = 0;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.pixelData = this.ctx.getImageData(0, 0, 320, 240);
    this.tick();
  }

  handlePlay = () => {
    this.playing = true;
    this.tick();
  }

  handleStop = () => {
    this.playing = false;
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
    if (this.playing) {
      setTimeout(this.tick, 10);
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <canvas
          height={240}
          ref={this.canvasRef}
          style={styles.canvas}
          width={320}
        />
        <div>
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    );
  }
}

const styles = {
  canvas: {
    height: 480,
    width: 640,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
};
