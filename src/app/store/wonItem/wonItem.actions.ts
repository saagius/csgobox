import { createAction, props } from '@ngrx/store';
import { WonItem } from '../../wonItem/wonItem';

export const setWonItem = createAction('[Won Item] Set Won Item', props<{ item: WonItem}>());
export const toggleWonItem  = createAction('[Won Item] Toggle Won Item');
