import { BoxRootState } from './box/box.reducer';
import { CurrentUserRootState } from './currentUser/currentUser.reducer';
import { WonItemRootState } from './wonItem/wonItem.reducer';

export type AppState =
	BoxRootState
	& CurrentUserRootState
	& WonItemRootState;
