interface IMobileDateSelector {
  selectedDate: any;
  setSelectedDate: any;
}

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { classNames } from "./utils";

const MobileDateSelector = ({
  selectedDate,
  setSelectedDate,
}: IMobileDateSelector) => {
  const todaysDate = new Date();

  /**
   * Offsets the selected date by the given number of days (+/-).
   * Also directly changes the state value of `selectedDate`.
   * @param offsetDays - The number of days to offset the selected date by. Can be positive or negative.
   */
  const changeSelectedDateByOffset = (offsetDays: number) => {
    const d = new Date();
    d.setDate(selectedDate.getDate() + offsetDays);

    setSelectedDate(d);
  };

  /**
   * Checks if two dates are on the same day, irrespective of time
   * @param {Date} first
   * @param {Date} second
   * @returns {boolean} true if the dates are on the same day
   */
  const areDatesOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const isSelectedDateToday = () => areDatesOnSameDay(selectedDate, todaysDate);

  return (
    <div className="fixed bottom-0 left-0 w-full px-4 pb-4 mx-auto">
      <div className="relative z-0 inline-flex justify-center w-full rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
          onClick={() => changeSelectedDateByOffset(-1)}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-white bg-green-600 border border-gray-300 select-none">
          {isSelectedDateToday()
            ? "Today"
            : selectedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
        </span>
        <button
          type="button"
          className={classNames(
            isSelectedDateToday()
              ? "cursor-not-allowed bg-gray-300"
              : "hover:bg-gray-50",
            "-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500  focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
          )}
          onClick={() => changeSelectedDateByOffset(1)}
          disabled={isSelectedDateToday()}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default MobileDateSelector;
