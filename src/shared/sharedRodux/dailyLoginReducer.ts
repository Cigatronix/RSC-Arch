import Rodux from "@rbxts/rodux";

/**
 * [ Rodux Action Interface ]
 * - Type: `IncreaseDailyLoginCounter`
 * - Responsible for increasing the daily login streak counter in a player's rodux store.
 */
export interface IncreaseDailyLoginCounterAction extends Rodux.Action<"IncreaseDailyLoginCounter"> {}

/**
 * [ Rodux Action Interface ]
 * - Type: `ResetDailyLoginCounter`
 * - Responsible for resetting the daily login streak counter in a player's rodux store.
 */
export interface ResetDailyLoginCounterAction extends Rodux.Action<"ResetDailyLoginCounter"> {}

/**
 * [ Rodux Reducer ]
 * - A reducer responsible for handling actions related to the daily login streak counter in a player's rodux store.
 */
export const dailyLoginReducer = Rodux.createReducer<
	number,
	IncreaseDailyLoginCounterAction | ResetDailyLoginCounterAction
>(0, {
	IncreaseDailyLoginCounter: (state, action) => {
		const newState = state + 1;
		return newState;
	},
	ResetDailyLoginCounter: (state, action) => {
		const newState = 0;
		return newState;
	},
});
