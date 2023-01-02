const ninjaSprite = {
  name: 'monster',
  size: { width: 75, height: 75 },
  animationTypes: ['IDLE', 'WALK'],
  frames: [
    require('./ninja_idle_1.png'),
    require('./ninja_idle_2.png'),
    require('./ninja_idle_3.png'),
    require('./ninja_run_1.png'),
    require('./ninja_run_2.png'),
    require('./ninja_run_3.png'),
    require('./ninja_run_4.png'),
    require('./ninja_run_5.png'),
    require('./ninja_run_6.png'),
    require('./ninja_run_7.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0, 1, 2, 1, 0]
      case 'WALK':
        return [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 1, 0]
    }
  },
}

export default ninjaSprite
