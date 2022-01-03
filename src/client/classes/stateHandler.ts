import Rodux from "@rbxts/rodux";
import { Players } from "@rbxts/services";
import { clientMiddleware } from "client/middlewares/clientMiddleware";
import { remotesClass } from "shared/classes/remotesClass";
import { StoreActions, ValidProfile } from "shared/sharedRodux";
import { currenciesReducer } from "shared/sharedRodux/currencies";
import { dailyLoginReducer } from "shared/sharedRodux/dailyLoginReducer";

const localPlayer = Players.LocalPlayer;

export class stateHandler {
	/**
	 * The store of the local client.
	 */
	protected static localStore: Rodux.Store<ValidProfile>;

	/**
	 * A collection of stores for other clients.
	 */
	protected static foreignStores: Map<number, Rodux.Store<ValidProfile>> = new Map();

	/**
	 * Creates and caches a player-specific store passed from the server.
	 * @param player The player object.
	 * @param ValidProfile The profile data of the player.
	 */
	public static createStore(player: Player, playerData: ValidProfile): void {
		const combinedReducers = Rodux.combineReducers({
			dailyLoginStreak: dailyLoginReducer,
			currencies: currenciesReducer,
		});

		const playerStore = new Rodux.Store(combinedReducers, playerData, [clientMiddleware(player)], undefined);
		this.foreignStores.set(player.UserId, playerStore);

		print(`Store created for player ${player.Name}`);
	}

	/**
	 * Retrieves a store of a player.
	 * @param player The player object.
	 */
	public static getStore(player: Player): Rodux.Store<ValidProfile> {
		if (player.UserId === localPlayer.UserId) {
			return this.localStore;
		}

		const playerStore = this.foreignStores.get(player.UserId);
		if (playerStore === undefined) throw `Expected to find a store for player ${player.Name}.`;

		return playerStore;
	}

	/**
	 * Replicates changes on the server to the provided player store based on the action passed.
	 * @param player The player object.
	 * @param action The action object.
	 */
	public static updateStore(player: Player, action: StoreActions): void {
		const playerStore = this.getStore(player);

		playerStore.dispatch(action);
	}
}

remotesClass.createStoreRemote.OnClientEvent.Connect(stateHandler.createStore);
remotesClass.storeReplicationRemote.OnClientEvent.Connect(() => stateHandler.updateStore);
