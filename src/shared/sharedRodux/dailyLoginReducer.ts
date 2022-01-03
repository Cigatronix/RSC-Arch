import Rodux from "@rbxts/rodux";

export interface IncreaseDailyLoginCounterAction extends Rodux.Action<"IncreaseDailyLoginCounter"> {}

export interface ResetDailyLoginCounterAction extends Rodux.Action<"ResetDailyLoginCounter"> {}

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
