/**
  Return the current date in the format `day/month/year`
*/
export function formattedDate() {
  const date = new Date();
  let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;
  return `${day}/${month}/${year}`;
}

/**
  Make an object immutable
*/
export function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach(value => {
    if (value && typeof value === 'object') deepFreeze(value);
  });
}
