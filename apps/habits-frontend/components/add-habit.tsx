import { useState } from "react";

interface IAddHabit {
  createHabit: (habitTitle: string) => void;
}

const AddHabit = ({ createHabit }: IAddHabit) => {
  const [habitTitle, setHabitTitle] = useState("");

  return (
    <div className="relative flex items-start py-4">
      <div className="flex-1 min-w-0 text-sm">
        <label htmlFor="habit-title" className="sr-only">
          Habit Title
        </label>
        <input
          type="text"
          name="habit-title"
          id="habit-title"
          className="block w-full p-0 text-sm font-medium border-none shadow-sm sm:text-sm focus:ring-0"
          placeholder="Add new habit..."
          value={habitTitle}
          onChange={(e) => setHabitTitle(e.target.value)}
          autoFocus
        />
      </div>
      <div className="flex items-center h-5 ml-3">
        <>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={(e) => {
              e.preventDefault();
              createHabit(habitTitle);
              setHabitTitle("");
            }}
          >
            Create
          </button>
        </>
      </div>
    </div>
  );
};

export default AddHabit;
