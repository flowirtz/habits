import * as DB from "worktop/kv";
import { ulid } from "worktop/utils";
import type { ULID } from "worktop/utils";
import type { KV } from "worktop/kv";

declare const HABITS: KV.Namespace;

export interface Habit {
  uid: ULID;
  created_at: number;
  updated_at: number | null;

  title: string;
  current_streak: number;
  // Dict with date-index, value is number of completions
  dates_completed: {
    [date: string]: number;
  };
}

const toPrefix = (username: string) => `user::${username}::habits::`;
const toKeyname = (username: string, uid: string) => toPrefix(username) + uid;

/**
 * Get a list of Habit IDs for <username>
 */
export async function list(
  username: string,
  options: { limit?: number; page?: number } = {}
): Promise<string[]> {
  const prefix = toPrefix(username);
  const keys = await DB.paginate<string[]>(HABITS, { ...options, prefix });
  //    ^keys are the full KV key names
  // Remove the `prefix::` from each of them
  return keys.map((x) => x.substring(prefix.length));
}

/**
 * Force-write a `Habit` record
 */
export function save(username: string, item: Habit) {
  const key = toKeyname(username, item.uid);
  return DB.write(HABITS, key, item);
}

/**
 * Find a `Habit` record by its <username>::<uid> pair
 */
export function find(username: string, uid: string) {
  const key = toKeyname(username, uid);
  return DB.read<Habit>(HABITS, key, "json");
}

/**
 * Create a new `Habit` record for <username>
 * - Ensures the `uid` value is unique to them
 * - Carefully picks value-keys for the record data
 * - Synchronizes owner's ID list for `GET /habits` route
 */
export async function insert(username: string, item: Partial<Habit>) {
  try {
    // Generate new UID
    const nextID = await DB.until(
      () => ulid(), // 8 character string
      (x) => find(username, x) // check if unique for user
    );

    const values: Habit = {
      uid: nextID,
      created_at: Date.now(),
      updated_at: null,

      title: item.title!, // validated in route
      current_streak: 0,
      dates_completed: {},
    };

    // exit early if could not save new `Habit` record
    if (!(await save(username, values))) return;

    // return the new item
    return values;
  } catch (err) {
    // void
  }
}

/**
 * Update an existing `Habit` record for <username>
 * - Carefully picks value-keys to be saved
 * - Ensures `updated_at` is touched
 */
export async function update(username: string, item: Habit) {
  // Pick values explictly
  const values: Habit = {
    uid: item.uid,
    created_at: item.created_at,
    updated_at: Date.now(),

    title: item.title.trim(),
    current_streak: item.current_streak,
    dates_completed: item.dates_completed,
  };

  const success = await save(username, values);
  if (success) return values;
}

/**
 * Remove an existing `Habit` record
 * - Synchronizes owner's ID list for `GET /habits` route
 */
export function destroy(username: string, uid: string) {
  const key = toKeyname(username, uid);
  return DB.remove(HABITS, key);
}
