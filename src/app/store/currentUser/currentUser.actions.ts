import { createAction, props } from '@ngrx/store';

import { User, Wallet } from '../../user/user';

export const loadCurrentUser = createAction('[Current User] Load Current User');
export const loadCurrentUserSuccess = createAction('[Current User] Load Current User Success', props<{ user: User }>());
export const loadCurrentUserError = createAction('[Current User] Load Current User Error');

export const subscribeToWalletUpdates = createAction('[Current User] Wallet Updates');
export const subscribeToWalletUpdatesSuccess = createAction('[Current User] Wallet Updates Success', props<{ wallet: Wallet }>());
export const subscribeToWalletUpdatesError = createAction('[Current User] Wallet Updates Error');
