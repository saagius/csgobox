import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

import { map } from 'rxjs/operators';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { CurrentUserQuery, UpdateWalletSubscriptionPayload, User, Wallet } from '../user/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private apollo: Apollo) {
	}

	getCurrentUser(): Observable<User> {
		return this.apollo
			.watchQuery<CurrentUserQuery>({
				query: gql`
		          query {
					  currentUser {
					    id
					    name
					    wallets {
					      id
					      name
					      amount
					      currency
					    }
					  }
					}
		        `,
			})
			.valueChanges.pipe(map((result: ApolloQueryResult<CurrentUserQuery>) => result.data.currentUser))
	}

	onUpdateWallet(): Observable<Wallet> {
		return this.apollo
			.subscribe({
				query: gql`
					subscription OnUpdateWallet {
					  updateWallet {
					    wallet {
					      id
					      name
					      amount
					    }
					  }
					}
				`,
			})
			.pipe(map((result: any) => {
				return result.data.updateWallet.wallet;
			}));
	}
}
