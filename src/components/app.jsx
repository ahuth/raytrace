import React from 'react';

export default class App extends React.Component {
  canvasRef = React.createRef();
  playing = false;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  handlePlay = () => {
    this.playing = true;
  }

  handleStop = () => {
    this.playing = false;
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
