import { HabitEntity } from "types";

export const getHabitsWithUpdatedStats = (habits: Required<HabitEntity>[]) => {
  const newHabits = habits.map(habits => ({ ...habits }));
  newHabits.forEach(habit => {
    const habitLastUpdateInFullDays = Math.floor(new Date(habit.lastStatUpdateDate).getTime() / (1000 * 60 * 60 * 24));
    const currentTimeInFullDays = Math.floor(new Date().setHours(0, 0, 0, 0) / (1000 * 60 * 60 * 24));
    const differenceInDays = currentTimeInFullDays - habitLastUpdateInFullDays;
    if (differenceInDays < 0) {
      for (let i = 0; i < Math.abs(differenceInDays); i++) {
        habit.stats.pop();
      }
    } else {
      habit.stats.push(...Array(differenceInDays).fill(0));
    }
    if (habit.stats.length < 40) {
      habit.stats.unshift(...Array(40 - habit.stats.length).fill(0));
    }
    habit.lastStatUpdateDate = new Date(new Date().setHours(0,0,0,0));
  });
  return newHabits
}