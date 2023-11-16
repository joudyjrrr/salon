export const DefaultFromDate = () => {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const newNow = now.toISOString().slice(0, 16);

  return newNow;
};

export const DefaultToDate = () => {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setDate(now.getDate() + 1);
  const newNow = now.toISOString().slice(0, 16);
  return newNow;
};
