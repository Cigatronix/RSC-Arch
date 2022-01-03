import Rodux from "@rbxts/rodux";
import { AddGoldAction, RemoveGoldAction, ResetGoldAction } from "./currencies/goldReducer";
import { IncreaseDailyLoginCounterAction, ResetDailyLoginCounterAction } from "./dailyLoginReducer";

export interface ValidProfile {
	dailyLoginStreak: number;
	currencies: {
		gold: number;
	};
}

export type StoreActions = (
	| IncreaseDailyLoginCounterAction
	| ResetDailyLoginCounterAction
	| AddGoldAction
	| RemoveGoldAction
	| ResetGoldAction
) &
	Rodux.AnyAction;
