import React from 'react';

export default class App extends React.Component {
  canvasRef = React.createRef();

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
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
