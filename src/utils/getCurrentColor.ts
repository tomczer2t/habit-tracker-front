import { getStreaksInfo } from './getCurrentStreak';
import { colorShade } from './colorShade';

export const getCurrentColor = (stats: number[], currentStatIndex: number, defaultColor: string) => {
  const { currentStreak, entireStreak } = getStreaksInfo(stats, currentStatIndex);
  let color: string;
  if (entireStreak > 10) {
    const MAX_DIFFERENCE = 170;
    const levels = Math.ceil(MAX_DIFFERENCE / entireStreak);
    color = colorShade(defaultColor, 100 - levels * currentStreak);
  } else if (entireStreak > 5) {
    color = colorShade(defaultColor, 100 - (20 * currentStreak));
  } else if (entireStreak > 3) {
    color = colorShade(defaultColor, 100 - (25 * currentStreak));
  } else {
    color = colorShade(defaultColor, 100 - (35 * currentStreak));
  }
  return color;
}
