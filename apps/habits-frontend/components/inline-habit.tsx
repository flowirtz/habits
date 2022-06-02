import StreakBadge from "./streak-badge";

import { IHabit } from "./api";

interface IInlineHabit {
  habit: IHabit;
  handleCompleted: any;
  inEditMode: boolean;
  selectedDate: any;
}

const InlineHabit = ({
  habit,
  handleCompleted,
  selectedDate,
}: IInlineHabit) => {
  const isChecked =
    selectedDate.toISOString().slice(0, 10) in habit.dates_completed;

  return (
    <div className="relative flex items-start py-4">
      <div className="flex-1 min-w-0 text-sm">
        <label
          htmlFor={`habit-${habit.uid}`}
          className="font-medium text-gray-700 select-none"
        >
          {habit.title}
        </label>
        <StreakBadge days={habit.current_streak} />
      </div>
      <div className="flex items-center h-5 ml-3">
        <input
          id={`habit-${habit.uid}`}
          name={`habit-${habit.uid}`}
          type="checkbox"
          onChange={() => handleCompleted(habit.uid)}
          checked={isChecked}
          disabled={isChecked}
          className="focus:ring-gray-500 h-4 w-4 text-green-600 border-gray-300 rounded p-2.5"
        />
      </div>
    </div>
  );
};

export default InlineHabit;
