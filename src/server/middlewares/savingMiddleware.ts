import Rodux from "@rbxts/rodux";
import { StoreActions, ValidProfile } from "shared/sharedRodux";

/**
 * [ Rodux Middleware ]
 * - Responsible for communicating changes made in a player's rodux store to the player's profile, ensuring that progress throughout the game is saved.
 *
 * @param playerProfile A player's profile.
 * @returns A rodux middleware.
 */
export const savingMiddleware = function (playerProfile: ValidProfile): Rodux.Middleware {
	return (nextDispatch) => {
		return (action: StoreActions) => {
			switch (action.type) {
				case "AddGold": {
					playerProfile.currencies.gold += action.amount;
					break;
				}
				case "RemoveGold": {
					playerProfile.currencies.gold -= action.amount;
					break;
				}
				case "ResetGold": {
					playerProfile.currencies.gold = 0;
					break;
				}
				case "IncreaseDailyLoginCounter": {
					playerProfile.dailyLoginStreak += 1;
					break;
				}
				case "ResetDailyLoginCounter": {
					playerProfile.dailyLoginStreak = 0;
					break;
				}
			}
		};
	};
};
