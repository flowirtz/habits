import { CheckIcon, PencilIcon, PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import useSWR from "swr";
import AddHabit from "./add-habit";
import {
  addHabit,
  getHabits,
  completeHabit,
  updateHabitInStore,
  addHabitToStore,
  IHabitStore,
} from "./api";

import InlineHabit from "./inline-habit";
import MobileDateSelector from "./mobile-date-selector";

interface IHabitList {
  user: any;
}

const HabitList = ({ user }: IHabitList) => {
  const todaysDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [inEditMode, setInEditMode] = useState(false);
  const [localHabitsStore, setLocalHabitsStore] = useState<IHabitStore>({
    habits: [],
  });

  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.sub}/habits`,
    () => getHabits(setLocalHabitsStore, user.sub)
  );

  const handleAddHabit = async (habitTitle: string) => {
    const newHabit = {
      title: habitTitle,
      current_streak: 0,
      dates_completed: {},
    };

    try {
      await mutate(
        addHabit(newHabit, localHabitsStore, setLocalHabitsStore, user.sub),
        {
          optimisticData: addHabitToStore(newHabit, data),
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Marks a habit as completed for the current day.
   * @param {string} uid - The uid of the habit to be marked as completed
   * @param {string} sub - The name of the currently logged in user
   */
  const handleCompleteHabit = async (uid: string) => {
    const prevCompletedHabit = data.habits.find((habit) => habit.uid === uid);
    const completedHabit = {
      ...prevCompletedHabit,
      current_streak: prevCompletedHabit.current_streak + 1,
      dates_completed: {
        ...prevCompletedHabit.dates_completed,
        [todaysDate]: 1,
      },
    };

    try {
      await mutate(
        completeHabit(uid, localHabitsStore, setLocalHabitsStore, user.sub),
        {
          optimisticData: updateHabitInStore(completedHabit, data),
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-10 mx-auto max-w-7xl">
      <header className="inline-flex justify-between w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Daily Habits
        </h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => setInEditMode(!inEditMode)}
        >
          {inEditMode ? (
            <CheckIcon
              className="w-5 h-5 mr-2 -ml-1 text-gray-500"
              aria-hidden="true"
            />
          ) : (
            <PlusIcon
              className="w-5 h-5 mr-2 -ml-1 text-gray-500"
              aria-hidden="true"
            />
          )}
          {inEditMode ? "Done" : "Add"}
        </button>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-4">
          <div className="px-4 mx-4 my-8 bg-white rounded-lg">
            <fieldset>
              <div className="border-gray-200 divide-y divide-gray-200">
                {data ? (
                  <>
                    {data.habits.map((habit, habitIdx) => (
                      <InlineHabit
                        habit={habit}
                        inEditMode={false}
                        key={`habit-${habitIdx}`}
                        handleCompleted={handleCompleteHabit}
                        selectedDate={selectedDate}
                      />
                    ))}
                    {(inEditMode || data.habits.length === 0) && (
                      <AddHabit createHabit={handleAddHabit} />
                    )}
                  </>
                ) : (
                  <div className="py-4">Loading...</div>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </main>
      <MobileDateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default HabitList;
