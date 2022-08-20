import PropTypes from 'prop-types';
import {gsap} from 'gsap';
import {useEffect} from 'react';
import style from './Loader.module.css';

export const Loader = ({fill = '#fff', stroke = '#fff'}) => {
  const getHash = bit => {
    let bitZero = '';

    for (let i = 0; i < bit; i++) bitZero += '0';

    return (bitZero + Math.floor(Math.random() * +`0x1${bitZero}`).toString(16)).slice(-bit);
  };
  const hash = getHash(6);

  useEffect(() => {
    const blendEases = (startEase, endEase, blender) => {
      const s = gsap.parseEase(startEase);
      const e = gsap.parseEase(endEase);
      blender = gsap.parseEase(blender || 'power3.inOut');
      return function(v) {
        const b = blender(v);
        return s(v) * (1 - b) + e(v) * b;
      };
    };

    gsap.set('svg', {visibility: 'visible'});

    const tl = gsap.timeline({repeat: -1});

    tl
      .to(`.leader-${hash}`, {
        duration: 4,
        x: 36 * 3,
        ease: blendEases('circ.in', 'expo')
      })
      .to(`.follower-${hash}`, {
        duration: 2,
        svgOrigin: gsap.utils.wrap(['328 300', '364 300', '400 300', '436 300', '472 300']),
        rotation: -180,
        stagger: {
          amount: 2
        },
        ease: blendEases('circ.in', 'expo')
      }, 0)
      .to(`.whole-${hash}`, {
        x: 36,
        duration: 5,
        ease: 'linear',
      }, 0)
      .to(`.follower-${hash}`, {
        duration: 1.5,
        stagger: {
          amount: 1,
          repeat: 1,
          yoyo: true
        },
        ease: blendEases('power3.in', 'expo'),
        fillOpacity: 0
      }, 0);

    tl.timeScale(3);
  }, []);

  return (
    <div className={style.svg}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 250 750 100">
        <g className={`whole-${hash}`} fill={fill} stroke={stroke} strokeWidth="2">
          <circle className={`leader-${hash}`} cx="328" cy="300" r="13"/>
          <circle className={`follower-${hash}`} cx="364" cy="300" r="13"/>
          <circle className={`follower-${hash}`} cx="400" cy="300" r="13"/>
          <circle className={`follower-${hash}`} cx="436" cy="300" r="13"/>
          <circle className={`follower-${hash}`} cx="472" cy="300" r="13"/>
        </g>
      </svg>
    </div>
  );
};


Loader.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
};
