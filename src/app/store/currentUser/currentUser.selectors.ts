import { createFeatureSelector, createSelector } from '@ngrx/store';

import { currentUserFeatureKey, CurrentUserRootState, CurrentUserState } from './currentUser.reducer';
import { Wallet } from '../../user/user';

const selectCurrentUserFeature = createFeatureSelector<CurrentUserRootState, CurrentUserState>(currentUserFeatureKey);
export const selectCurrentUser = createSelector(
	selectCurrentUserFeature,
	(state: CurrentUserState) => {
		return state.user;
	}
)
export const selectWallets = createSelector(
	selectCurrentUserFeature,
	(state: CurrentUserState) => {
		return state.wallets;
	}
)

export const selectWallet = createSelector(
	selectCurrentUserFeature,
	(state: CurrentUserState, props: { id: string }) => {
		return state.wallets ? state.wallets[props.id] : null;
	}
)

export const selectWalletByName = createSelector(
	selectCurrentUserFeature,
	(state: CurrentUserState, props: { name: string }) => {
		if(state.wallets) {
			for(let walletId in state.wallets) {
				const wallet: Wallet = state.wallets[walletId];
				const walletName = wallet.name;

				if (walletName === props.name) {
					return wallet;
				}
			}
		}

		return null;
	}
)
