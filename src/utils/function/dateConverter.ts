export const dateConverter = (dateString: string) => {
  const date = new Date(dateString);

  const options = {
    weekday: "short", // 'Mon'
    month: "short", // 'Dec'
    year: "numeric", // '2024'
  };

  const newDate =
    new Intl.DateTimeFormat("en-US", options).format(date) + " • All Day";
  return newDate;
};
