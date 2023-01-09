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
    require('./chicken_boy_attack_0.png'),
    require('./chicken_boy_attack_1.png'),
    require('./chicken_boy_attack_2.png'),
    require('./chicken_boy_attack_3.png'),
    require('./chicken_boy_attack_4.png'),
    require('./chicken_boy_attack_5.png'),
    require('./chicken_boy_attack_6.png'),
    require('./chicken_boy_attack_7.png'),
    require('./chicken_boy_attack_8.png'),
    require('./chicken_boy_attack_9.png'),
    require('./chicken_boy_attack_10.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0, 1, 2, 3, 4, 3, 2, 1, 0]
      case 'WALK':
        return [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      case 'ATTACK':
        return [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    }
  },
}

export default chickenboySprite
