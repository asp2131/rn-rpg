const chickenboySprite = {
  name: 'monster',
  size: { width: 75, height: 75 },
  animationTypes: ['IDLE', 'WALK'],
  frames: [
    require('./chicken_boy_idle_0.png'),
    require('./chicken_boy_idle_1.png'),
    require('./chicken_boy_idle_3.png'),
    require('./chicken_boy_idle_4.png'),
    require('./chicken_boy_idle_5.png'),
    require('./chicken_boy_run_0.png'),
    require('./chicken_boy_run_1.png'),
    require('./chicken_boy_run_2.png'),
    require('./chicken_boy_run_3.png'),
    require('./chicken_boy_run_4.png'),
    require('./chicken_boy_run_5.png'),
    require('./chicken_boy_run_6.png'),
    require('./chicken_boy_run_7.png'),
    require('./chicken_boy_run_8.png'),
    require('./chicken_boy_run_9.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0, 1, 2, 3, 4, 3, 2, 1, 0]
      case 'WALK':
        return [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
  },
}

export default chickenboySprite
