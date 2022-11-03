import { createReducer, on } from '@ngrx/store';

import { loadCurrentUserSuccess, subscribeToWalletUpdatesSuccess } from './currentUser.actions';
import { User, Wallets } from '../../user/user';

export interface CurrentUserState {
	user?: User;
	wallets?: Wallets;
}

export const currentUserFeatureKey = 'currentUser';

export interface CurrentUserRootState {
	[currentUserFeatureKey]: CurrentUserState;
}

const initialState: CurrentUserState = {};

export const currentUserReducer = createReducer(
	initialState,
	on(loadCurrentUserSuccess, (state, { user: {
		id,
		name,
		wallets
	} }) => {
		const _wallets: Wallets = {};

		if(wallets && wallets.length) {
			wallets.forEach(wallet => {
				_wallets[wallet.id] = wallet;
			});
		}

		return {
			user: {
				id,
				name
			},
			wallets: _wallets
		}
	}),
	on(subscribeToWalletUpdatesSuccess, (state, { wallet }) => ({
		...state,
		wallets: {
			...state.wallets,
			[wallet.id]: wallet
		}
	}))
);
