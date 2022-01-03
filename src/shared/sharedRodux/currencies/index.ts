import Rodux from "@rbxts/rodux";
import { goldReducer } from "./goldReducer";

export const currenciesReducer = Rodux.combineReducers({
	gold: goldReducer,
});
