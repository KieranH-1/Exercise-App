import exercises from "../data/exercises.json"

export interface Exercise {
    name: string
    description: string
    type: string
    muscle_group: string
    image_url: string | null
  }
  

  export interface Equipment {
    name: string
    image_url: string | null
  }


  export function getExercise(exercise: string) {
    return exercises.items.find((item) => item.name == exercise) as Exercise
  }

  export function getEquipment(equipment: string) {
    return exercises.items.find((item) => item.name == equipment) as Equipment
  }