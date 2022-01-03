import Make from "@rbxts/make";
import Rodux from "@rbxts/rodux";
import { ReplicatedStorage } from "@rbxts/services";
import { StoreActions, ValidProfile } from "shared/sharedRodux";

export class remotesClass {
	/**
	 * Folder to handle remote events.
	 */
	public static remotesFolder: Folder;

	/**
	 * Remote event responsible for replicating a player's initial store to all clients.
	 */
	public static createStoreRemote: RemoteEvent<(player: Player, playerStore: ValidProfile) => void>;

	/**
	 * Remote event responsible for replicating a player store to a single client, or to all clients.
	 */
	public static storeReplicationRemote: RemoteEvent<(player: Player, action: StoreActions) => void>;

	/**
	 * Creates remotes for the class, upon request by the server.
	 */
	public static createRemotes(): { success: boolean } {
		this.remotesFolder = Make("Folder", {
			Name: "Remotes",
			Parent: ReplicatedStorage,
		});
		if (this.remotesFolder === undefined) return { success: false };

		this.createStoreRemote = Make("RemoteEvent", {
			Name: "CreateStore",
			Parent: this.remotesFolder,
		});
		if (this.createStoreRemote === undefined) return { success: false };

		this.storeReplicationRemote = Make("RemoteEvent", {
			Name: "StoreReplication",
			Parent: this.remotesFolder,
		});
		if (this.storeReplicationRemote === undefined) return { success: false };

		return { success: true };
	}
}
