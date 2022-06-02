export function addHabitToStore(
  newHabit: Partial<IHabit>,
  store: IHabitStore
): IHabitStore {
  let updatedStore = { ...store };

  updatedStore = {
    habits: [...store["habits"], newHabit],
  };

  return updatedStore;
}

export function updateHabitInStore(
  updatedHabit: Partial<IHabit>,
  store: IHabitStore
): IHabitStore {
  let updatedStore = { ...store };

  const completedHabitIndex = store["habits"].findIndex(
    (habit) => habit.uid === updatedHabit.uid
  );
  updatedStore["habits"][completedHabitIndex] = updatedHabit;

  return updatedStore;
}

export interface IHabit {
  uid: string;
  created_at: number;
  updated_at: number | null;

  title: string;
  current_streak: number;
  // Dict with date-index, value is number of completions
  dates_completed: {
    [date: string]: number;
  };
}

export interface IHabitStore {
  habits: Partial<IHabit>[];
}

export async function getHabits(setLocalHabitsStore, username) {
  const newHabitsStore = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/habits`
    )
  ).json();

  setLocalHabitsStore(newHabitsStore);

  return newHabitsStore;
}

export async function addHabit(
  habit,
  localHabitsStore,
  setLocalHabitsStore,
  username
) {
  console.log(habit);
  const addedHabit = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/habits`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habit),
      }
    )
  ).json();

  const newHabitsStore = addHabitToStore(addedHabit, localHabitsStore);
  setLocalHabitsStore(newHabitsStore);
  return newHabitsStore;
}

export async function completeHabit(
  habitUid,
  localHabitsStore,
  setLocalHabitsStore,
  username
) {
  console.log(habitUid);
  const completedHabit = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/habits/${habitUid}/complete`,
      {
        method: "PATCH",
      }
    )
  ).json();

  // Update habitsStore
  const newHabitsStore = updateHabitInStore(completedHabit, localHabitsStore);
  setLocalHabitsStore(newHabitsStore);

  return newHabitsStore;
}
