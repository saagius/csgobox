import { createFeatureSelector, createSelector } from '@ngrx/store';

import { boxFeatureKey, BoxRootState, BoxState } from './box.reducer';

const selectBoxFeature = createFeatureSelector<BoxRootState, BoxState>(boxFeatureKey);
export const selectBoxesLoaded = createSelector(
	selectBoxFeature,
	(state: BoxState) => {
		return Object.keys(state).length > 0;
	}
)
export const selectBoxIds = createSelector(
	selectBoxFeature,
	(state: BoxState) => {
		return Object.keys(state);
	}
)

export const selectBox = createSelector(
	selectBoxFeature,
	(state: BoxState, props: { id: string }) => {
		return state[props.id];
	}
)
