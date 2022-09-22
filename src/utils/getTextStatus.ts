export const getTextStatus = (stat: number) => {
  let textStatus: string;

  if (stat === 0) {
    textStatus = 'undone';
  } else if (stat === 2) {
    textStatus = 'done';
  } else {
    textStatus = 'skipped';
  }
  return textStatus;
};
