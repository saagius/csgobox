import { createReducer, on } from '@ngrx/store';

import { loadBoxSuccess, loadBoxesSuccess } from './box.actions';
import { Box } from '../../box/box';

export interface BoxState {
	[id: string]: Box;
}

export const boxFeatureKey = 'box';

export interface BoxRootState {
	[boxFeatureKey]: BoxState;
}

const initialState: BoxState = {};

export const boxReducer = createReducer(
	initialState,
	on(loadBoxSuccess, (state, { box }) => {
		return {
			...state,
			[box.id]: box
		}
	}),
	on(loadBoxesSuccess, (state, { boxes }) => boxes.edges.reduce((acc, box) => ({
		...acc,
		[box.node.id]: box.node
	}), {}))
);
