import { createFeatureSelector, createSelector } from '@ngrx/store';

import { wonItemFeatureKey, WonItemRootState, WonItemState } from './wonItem.reducer';

const selectWonItemFeature = createFeatureSelector<WonItemRootState, WonItemState>(wonItemFeatureKey);
export const selectWonItem = createSelector(
	selectWonItemFeature,
	(state: WonItemState) => {
		return state.item;
	}
)
export const selectWonItemShown = createSelector(
	selectWonItemFeature,
	(state: WonItemState) => {
		return state.show;
	}
)
