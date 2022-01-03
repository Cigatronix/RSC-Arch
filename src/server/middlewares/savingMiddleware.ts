import Rodux from "@rbxts/rodux";
import { StoreActions, ValidProfile } from "shared/sharedRodux";

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
