export const getStreaksInfo = (stats: number[], index: number) => {
  let currentStreak = 0;
  let entireStreak = 0;
  if (stats[index] === 0) {
    return { currentStreak, entireStreak };
  }

  // with index number
  const statsToIndex = stats.slice(0, index + 1);
  // without index number
  const statsPastIndex = stats.slice(index + 1);

  for (const number of statsToIndex.reverse()) {
    if (number === 2) {
      currentStreak++;
      entireStreak++;
    } else if (number === 0) break;
  }
  for (const number of statsPastIndex) {
    if (number === 2) {
      entireStreak++;
    } else if (number === 0) break;
  }
  return { currentStreak, entireStreak };
};
