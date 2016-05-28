import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import * as R from 'ramda';
import beaconOnMars from '../beacon-on-mars.mp3';

const CP_MULTIPLIER = 0.512286623256592433;
const loadTone = new Audio(beaconOnMars);

class Beacon extends Component {
  componentDidMount() {
    loadTone.play();
    this.loadToneInterval = setInterval(() => {
      if (loadTone.duration > 0 && !loadTone.paused) {
        loadTone.pause();
        loadTone.currentTime = 0;
        loadTone.play();
      } else {
        loadTone.play();
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.loadToneInterval);
  }

  render() {
    const { fill, stroke, w, h } = this.props;
    const d = buildWave(w, h, 24);

    return (
      <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={ w + 'px' }
        height={ h + 'px' }>
        <g>
          <rect x={ 0 } y={ 0 }
            width={ w } height={ h }
            fill={ fill }>
          </rect>
          <path className={ css(styles.path) }
            stroke={ stroke }
            fill={ 'none' }
            strokeWidth={ 2 }
            d={ d }>
          </path>
        </g>
      </svg>
    );
  }
}

Beacon.propTypes = {
  w: React.PropTypes.number,
  h: React.PropTypes.number,
  fill: React.PropTypes.string,
  stroke: React.PropTypes.string,
};

export default Beacon;

function buildWave(w, h, p) {
  const a = p / 4;
  const y = h / 2;
  const x = (w - w * 0.25 - 11 * a) / 2;

  const start = [
    'M', x, y + a / 2,
    'L', x + w * 0.25, y + a / 2,
    'c', a * CP_MULTIPLIER, 0,
    -(1 - a) * CP_MULTIPLIER, -a,
    a, -a,
  ];

  const wave = R.flatten(R.map((idx) => {
    const waveY = idx % 2 === 0 ? a : -a;

    return [...[
      's', -(1 - a) * CP_MULTIPLIER, waveY,
      a, waveY,
    ]];
  }, R.range(0, 10)));

  const pathData = [...start, ...wave];

  return pathData.join(' ');
}

const MOVE = {
  '0%': {
    'stroke-dasharray': '0 500',
  },
  '18.75%': {
    'stroke-dasharray': '50 500',
    'stroke-dashoffset': -50,
  },
  '45%': {
    'stroke-dasharray': '250 500',
    'stroke-dashoffset': -250,
  },
  '75%': {
    'stroke-dasharray': '100 500',
    'stroke-dashoffset': -500,
  },
  '100%': {
    'stroke-dasharray': '100 500',
    'stroke-dashoffset': -500,
  },
};

const styles = StyleSheet.create({
  path: {
    animationName: MOVE,
    animationDuration: '4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
});
