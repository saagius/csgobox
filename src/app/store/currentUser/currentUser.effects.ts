import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';

import {
	loadCurrentUser,
	loadCurrentUserError,
	loadCurrentUserSuccess,
	subscribeToWalletUpdates, subscribeToWalletUpdatesError, subscribeToWalletUpdatesSuccess
} from './currentUser.actions';
import { UserService } from '../../api/user.service';
import { User, Wallet } from '../../user/user';

@Injectable()
export class CurrentUserEffects {
	loadCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCurrentUser),
			switchMap(() => this.userService.getCurrentUser()),
			switchMap((user: User) => [
				loadCurrentUserSuccess({ user }),
				subscribeToWalletUpdates()
			]),
			catchError(() => [loadCurrentUserError()])
		)
	);

	subscribeToWallet$ = createEffect(() =>
		this.actions$.pipe(
			ofType(subscribeToWalletUpdates),
			switchMap(() => this.userService.onUpdateWallet()),
			switchMap((wallet: Wallet) => [
				subscribeToWalletUpdatesSuccess({ wallet })
			]),
			catchError(() => [subscribeToWalletUpdatesError()])
		)
	);

	constructor(private actions$: Actions, private userService: UserService) {
	}
}
