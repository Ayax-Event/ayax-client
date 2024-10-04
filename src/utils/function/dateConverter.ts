export const dateConverter = (dateString: string) => {
  const date = new Date(dateString);

  const options = {
    weekday: "short", // 'Mon'
    month: "short", // 'Dec'
    year: "numeric", // '2024'
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
