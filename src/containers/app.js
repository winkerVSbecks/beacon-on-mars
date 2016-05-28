import React, { Component } from 'react';
import { connect } from 'react-redux';
import Beacon from '../components/beacon';
import { windowResize } from '../actions/canvas';

function mapStateToProps(state) {
  return {
    width: state.canvas.get('width'),
    height: state.canvas.get('height'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
  };
}

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { width, height } = this.props;

    return (
      <Beacon
        w={ width }
        h={ height }
        fill={ '#180C00' }
        stroke={ '#39B8A3' } />
    );
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  windowResize: React.PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
