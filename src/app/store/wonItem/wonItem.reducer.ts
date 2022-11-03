import { createReducer, on } from '@ngrx/store';

import { setWonItem, toggleWonItem } from './wonItem.actions';
import { WonItem } from '../../wonItem/wonItem';

export const wonItemFeatureKey = 'wonItem';

export interface WonItemState {
	item?: WonItem;
	show: boolean;
}

export interface WonItemRootState {
	[wonItemFeatureKey]: WonItemState;
}

const initialState: WonItemState = {
	show: false
};

export const wonItemReducer = createReducer(
	initialState,
	on(setWonItem, (state, { item }) => {
		return {
			...state,
			item
		}
	}),
	on(toggleWonItem, (state) => {
		return {
			...state,
			show: !state.show
		}
	})
);
