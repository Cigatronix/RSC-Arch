import Rodux from "@rbxts/rodux";
import { goldReducer } from "./goldReducer";

/**
 * [ Rodux Reducer ]
 * - This reducer is responsible for combining reducers in the currencies array of the player's rodux store.
 */
export const currenciesReducer = Rodux.combineReducers({
	gold: goldReducer,
});
