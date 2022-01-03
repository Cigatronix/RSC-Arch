import Rodux from "@rbxts/rodux";

export interface AddGoldAction extends Rodux.Action<"AddGold"> {
	amount: number;
	replicateToAllClients: true;
}

export interface RemoveGoldAction extends Rodux.Action<"RemoveGold"> {
	amount: number;
}

export interface ResetGoldAction extends Rodux.Action<"ResetGold"> {}

export const goldReducer = Rodux.createReducer<number, AddGoldAction | RemoveGoldAction | ResetGoldAction>(0, {
	AddGold: (state, action) => {
		const newState = state + action.amount;
		return newState;
	},
	RemoveGold: (state, action) => {
		const newState = state - action.amount;
		return newState;
	},
	ResetGold: (state, action) => {
		const newState = 0;
		return newState;
	},
});
