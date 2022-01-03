import Rodux from "@rbxts/rodux";

/**
 * [ Rodux Action Interface ]
 * - Type: `AddGold`
 * - Responsible for adding gold to a player's rodux store.
 */
export interface AddGoldAction extends Rodux.Action<"AddGold"> {
	amount: number;
	replicateToAllClients: true;
}

/**
 * [ Rodux Action Interface ]
 * - Type: `RemoveGold`
 * - Responsible for removing gold from a player's rodux store.
 */
export interface RemoveGoldAction extends Rodux.Action<"RemoveGold"> {
	amount: number;
}

/**
 * [ Rodux Action Interface ]
 * - Type: `ResetGold`
 * - Responsible for resetting the amount of gold in a player's rodux store.
 */
export interface ResetGoldAction extends Rodux.Action<"ResetGold"> {}

/**
 * [ Rodux Reducer ]
 * - A reducer to manage the `gold` currency.
 */
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
