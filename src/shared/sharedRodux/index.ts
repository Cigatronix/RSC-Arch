import Rodux from "@rbxts/rodux";
import { AddGoldAction, RemoveGoldAction, ResetGoldAction } from "./currencies/goldReducer";
import { IncreaseDailyLoginCounterAction, ResetDailyLoginCounterAction } from "./dailyLoginReducer";

/**
 * [ ProfileService Interface ]
 * - An interface that outlines the expected properties when referencing a player's profile.
 */
export interface ValidProfile {
	dailyLoginStreak: number;
	currencies: {
		gold: number;
	};
}

/**
 * [ Rodux Type ]
 * - Defines all the actions allowed to be dispatched to a player rodux store.
 */
export type StoreActions = (
	| IncreaseDailyLoginCounterAction
	| ResetDailyLoginCounterAction
	| AddGoldAction
	| RemoveGoldAction
	| ResetGoldAction
) &
	Rodux.AnyAction;
