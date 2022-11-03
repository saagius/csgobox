import { createAction, props } from '@ngrx/store';

import { Box, BoxConnection } from '../../box/box';

export const loadBoxes = createAction('[Box List] Load Boxes');
export const loadBoxesSuccess = createAction('[Box List] Load Boxes Success', props<{ boxes: BoxConnection }>());
export const loadBoxesError = createAction('[Box List] Load Boxes Error');

export const openBox = createAction('[Open Box] Open Box', props<{ box: Box }>());
export const openBoxSuccess = createAction('[Open Box] Open Box Success', props<{ win: any }>());
export const openBoxError = createAction('[Open Box] Open Box Error');

export const loadBox = createAction('[Box] Load Box', props<{ id: string }>());
export const loadBoxSuccess = createAction('[Box] Load Box Success', props<{ box: Box }>());
export const loadBoxError = createAction('[Box] Load Box Error');
