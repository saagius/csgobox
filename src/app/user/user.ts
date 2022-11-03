export type Wallet = {
	id: string;
	name: string;
	amount: number;
	currency: string;
}

export interface Wallets {
	[x: string]: Wallet;
}

export type User = {
	id: string;
	name: string;
	wallets?: Wallet[];
}

export type CurrentUserQuery = {
	currentUser: User
};

export type UpdateWalletSubscriptionPayload = {
	wallet: Wallet
};
