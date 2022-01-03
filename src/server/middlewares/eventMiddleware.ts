import Rodux from "@rbxts/rodux";
import { remotesClass } from "shared/classes/remotesClass";
import { StoreActions } from "shared/sharedRodux";

export const eventMiddleware = function (player: Player): Rodux.Middleware {
	const storeReplicationRemote = remotesClass.storeReplicationRemote;

	return (nextDispatch) => {
		return (action: StoreActions) => {
			if (action.replicateToAllClients !== undefined) {
				storeReplicationRemote.FireAllClients(action);
			} else {
				storeReplicationRemote.FireClient(player, action);
			}
		};
	};
};
