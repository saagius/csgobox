import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { selectCurrentUser, selectWallets } from '../store/currentUser/currentUser.selectors';
import { Wallet, Wallets } from '../user/user';
import { loadCurrentUser } from '../store/currentUser/currentUser.actions';

@Component({
	selector: 'app-login',
	template: `
        <div class="login">
            <div *ngIf="$user | async as user; else showLogin" class="user-details">
                <div class="user-name">Hi, {{user.name}}</div>
	            <div class="wallet" *ngIf="$wallets | async as wallets">
                    <img src="https://www-staging.csgoroll.com/en/assets/icons/coins.svg" />
                    {{ showWalletInfo(wallets, "MAIN") }}
	            </div>
            </div>
            <ng-template #showLogin>
                <button (click)="login()">Login</button>
            </ng-template>
        </div>
	`,
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	$user = this.store.select(selectCurrentUser);
	$wallets = this.store.select(selectWallets);

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.login();
	}

	login() {
		this.store.dispatch(loadCurrentUser());
	}

	showWalletInfo(wallets: Wallets, walletName: string) {
		for(let walletId in wallets) {
			const wallet: Wallet = wallets[walletId];
			const _walletName = wallet.name;

			if (_walletName === walletName) {
				return `${wallet.amount}`;
			}
		}

		return '';
	}
}
