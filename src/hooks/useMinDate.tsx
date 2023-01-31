import { useState } from "react";

const useMinDate = () => {
  const [minDate, setMinDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month =
      date.getMonth() < 9
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;

    const day =
      date.getDate() + 1 < 9 ? `0${date.getDate()}` : `${date.getDate()}`;

    return `${year}-${month}-${day}`;
  });
  return [minDate, setMinDate];
};

export default useMinDate;
