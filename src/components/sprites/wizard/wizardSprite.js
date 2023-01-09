const wizardSprite = {
  name: 'monster',
  size: { width: 75, height: 75 },
  animationTypes: ['IDLE', 'WALK'],
  frames: [
    require('./wizard_idle_0.png'),
    require('./wizard_idle_1.png'),
    require('./wizard_idle_2.png'),
    require('./wizard_idle_3.png'),
    require('./wizard_idle_4.png'),
    require('./wizard_idle_5.png'),
    require('./wizard_run_0.png'),
    require('./wizard_run_1.png'),
    require('./wizard_run_2.png'),
    require('./wizard_run_3.png'),
    require('./wizard_run_4.png'),
    require('./wizard_run_5.png'),
    require('./wizard_attack_0.png'),
    require('./wizard_attack_1.png'),
    require('./wizard_attack_2.png'),
    require('./wizard_attack_3.png'),
    require('./wizard_attack_4.png'),
    require('./wizard_attack_5.png'),
    require('./wizard_attack_6.png'),
    require('./wizard_attack_7.png'),
    require('./wizard_attack_8.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
      case 'WALK':
        return [7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7]
      case 'ATTACK':
        return [14, 15, 16, 17, 18, 19, 20, 21]
    }
  },
}

export default wizardSprite
