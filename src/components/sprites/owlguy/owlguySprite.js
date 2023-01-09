const owlguySprite = {
  name: 'monster',
  size: { width: 75, height: 75 },
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./owl_walk_0.png'),
    require('./owl_walk_1.png'),
    require('./owl_walk_2.png'),
    require('./owl_walk_3.png'),
    require('./owl_walk_4.png'),
    require('./owl_walk_5.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [5]
      case 'WALK':
        return [0, 1, 2, 3, 4, 5, 0]
    }
  },
}

export default owlguySprite
