import Rodux from "@rbxts/rodux";
import { remotesClass } from "shared/classes/remotesClass";
import { StoreActions } from "shared/sharedRodux";

/**
 * [ Rodux Middleware ]
 * - Responsible for communicating server-made changes to a player's rodux store to the player's client.
 *
 * @param player The player object.
 * @returns A rodux middleware.
 */
export const eventMiddleware = function (player: Player): Rodux.Middleware {
	const storeReplicationRemote = remotesClass.storeReplicationRemote;

	return (nextDispatch) => {
		return (action: StoreActions) => {
			if (action.replicateToAllClients !== undefined) {
				storeReplicationRemote.FireAllClients(player, action);
			} else {
				storeReplicationRemote.FireClient(player, player, action);
			}
		};
	};
};
