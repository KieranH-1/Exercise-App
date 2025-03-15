export interface Exercise {
    name: string
    description: string
    type: 'cardio' | 'strength' | 'flexibility' | 'calisthenics'
    muscleGroup: 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'core'
    pictureUrl: string
  }
  

  export interface Equipment {
    name: string
    description: string
    pictureUrl: string
  }
