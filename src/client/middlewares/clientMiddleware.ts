import Rodux from "@rbxts/rodux";
import { StoreActions } from "shared/sharedRodux";

/**
 * [ Rodux Middleware ]
 * - Communicates actions made to a player's rodux store to necessary areas of the client.
 *
 * @param player The player object.
 * @returns A rodux middleware.
 */
export const clientMiddleware = function (player: Player): Rodux.Middleware {
	return (nextDispatch) => {
		return (action: StoreActions) => {
			switch (action.type) {
				case "AddGold": {
					print("Added gold");
					break;
				}
				case "RemoveGold": {
					print("Removed gold");
					break;
				}
				case "ResetGold": {
					print("Reset gold");
					break;
				}
				case "IncreaseDailyLoginCounter": {
					print("Increased daily login counter.");
					break;
				}
				case "ResetDailyLoginCounter": {
					print("Reset daily login counter.");
					break;
				}
			}
		};
	};
};
