import React from 'react';
import Scene from './scene.jsx';

export default class App extends React.Component {
  state = { playing: false };

  handlePlay = () => {
    this.setState({ playing: true });
  }

  handleStop = () => {
    this.setState({ playing: false });
  }

  render() {
    return (
      <div style={styles.container}>
        <Scene playing={this.state.playing} />
        <div>
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
};
