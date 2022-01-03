import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import Rodux from "@rbxts/rodux";
import { Players } from "@rbxts/services";
import { eventMiddleware } from "server/middlewares/eventMiddleware";
import { savingMiddleware } from "server/middlewares/savingMiddleware";
import { remotesClass } from "shared/classes/remotesClass";
import { ValidProfile } from "shared/sharedRodux";
import { currenciesReducer } from "shared/sharedRodux/currencies";
import { dailyLoginReducer } from "shared/sharedRodux/dailyLoginReducer";

const createRemoteEvents = remotesClass.createRemotes();
assert(createRemoteEvents, `There was an issue while initializing the game's remote events.`);

/**
 * Initializes a player's saved profile upon joining, initializes a rodux store for the player, and saves any progress made upon player leaving.
 */
export class dataClass {
	/**
	 * The default template to compare and match cached player data too.
	 */
	public static profileTemplate: ValidProfile = {
		dailyLoginStreak: 0,
		currencies: {
			gold: 0,
		},
	};

	/**
	 * The ProfileService profile store.
	 */
	public static profileStore = ProfileService.GetProfileStore("mainstore", this.profileTemplate);

	/**
	 * A collection of all player profiles.
	 */
	public static playerProfiles: Map<number, Profile<ValidProfile>> = new Map();

	/**
	 * A collection of player stores.
	 */
	public static playerStores: Map<number, Rodux.Store<ValidProfile>>;

	/**
	 * Loads and compares cached/saved player data with the profile template.
	 * @param player The player object.
	 */
	public static registerPlayer(player: Player): void {
		const playerProfile = this.profileStore.LoadProfileAsync(tostring(player.UserId));

		if (playerProfile === undefined) {
			player.Kick(`There was an issue while loading your data. Please rejoin in a few minutes.`);
			return;
		}

		playerProfile.AddUserId(player.UserId);
		playerProfile.Reconcile();

		playerProfile.ListenToRelease(() => {
			this.playerProfiles.delete(player.UserId);

			player.Kick(`There were cross-server conflicts while loading your data. Please rejoin in a few minutes.`);
			return;
		});

		if (!player.IsDescendantOf(Players)) {
			playerProfile.Release();
		}

		const combinedReducers = Rodux.combineReducers({
			dailyLoginStreak: dailyLoginReducer,
			currencies: currenciesReducer,
		});

		const playerStore = new Rodux.Store(
			combinedReducers,
			playerProfile.Data,
			[eventMiddleware(player), savingMiddleware(playerProfile.Data)],
			undefined,
		);

		this.playerProfiles.set(player.UserId, playerProfile);
		this.playerStores.set(player.UserId, playerStore);
	}

	/**
	 * Saves player data, and runs the release function on their profile.
	 * @param player The player object.
	 */
	public static removePlayerFromRegistry(player: Player): void {
		const profile = this.playerProfiles.get(player.UserId);
		if (profile === undefined)
			return warn(`Expected to find profile for ${player.Name} with UserId: ${player.UserId}`);

		profile.Release();
	}
}

for (const player of Players.GetPlayers()) {
	coroutine.wrap(() => {
		dataClass.registerPlayer(player);
	});
}

Players.PlayerAdded.Connect(() => dataClass.registerPlayer);
Players.PlayerRemoving.Connect(() => dataClass.removePlayerFromRegistry);
