import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql, MutationResult } from 'apollo-angular';

import { Box, BoxConnection, BoxesQuery, BoxQuery, OpenBoxInput } from '../box/box';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client';

@Injectable({
	providedIn: 'root'
})
export class BoxService {
	constructor(private apollo: Apollo) {
	}

	getBox(id: string): Observable<Box> {
		return this.apollo
			.watchQuery<BoxQuery>({
				query: gql`
		          query {
					  box (id: "${id}") {
				        id
				        name
				        iconUrl
				        cost
					  }
				}
		        `,
			})
			.valueChanges.pipe(map((result: ApolloQueryResult<BoxQuery>) => result.data.box))
	}

	getBoxes(free: boolean, purchasable: boolean, openable: boolean): Observable<BoxConnection> {
		return this.apollo
			.watchQuery<BoxesQuery>({
				query: gql`
		          query {
					  boxes(free: ${free}, purchasable: ${purchasable}, openable: ${openable}) {
					    edges {
					      node {
					        id
					        name
					        iconUrl
					        cost
					      }
					    }
					  }
					}
		        `,
			})
			.valueChanges.pipe(map((result: ApolloQueryResult<BoxesQuery>) => result.data.boxes))
	}

	openBox(box: Box) {
		const input: OpenBoxInput = {
			boxId: box.id,
			amount: 1
		};

		return this.apollo
			.mutate({
				mutation: gql`
					mutation OpenBox($input: OpenBoxInput!) {
					  openBox(input: $input) {
					    boxOpenings {
					      id
					      itemVariant {
					        id
					        name
					        value
					      }
					    }
					  }
					}
				`,
				variables: {
					input
				},
				update: ((store, { data }) => {
					console.log(data);
					// {"data":{"openBox":{"boxOpenings":[{"id":"Qm94T3BlbmluZzo0ODg0MTYw","itemVariant":{"id":"SXRlbVZhcmlhbnQ6MTQ3ODU","name":"Fade","value":3080,"__typename":"ItemVariant"},"__typename":"BoxOpening"}],"__typename":"CreateBoxOpeningPayload"}}}
				})
			})
			.pipe(map((result: MutationResult<any>) => result.data))
	}
}
