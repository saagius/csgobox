import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';

import { BoxService } from '../../api/box.service';
import {
	loadBox, loadBoxError,
	loadBoxes,
	loadBoxesError,
	loadBoxesSuccess, loadBoxSuccess,
	openBox,
	openBoxError,
	openBoxSuccess
} from './box.actions';
import { Box, BoxConnection } from '../../box/box';
import { setWonItem, toggleWonItem } from '../wonItem/wonItem.actions';

@Injectable()
export class BoxEffects {
	loadBoxes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadBoxes),
			switchMap(() => this.boxService.getBoxes(false, true, true)),
			switchMap((boxes: BoxConnection) => [
				loadBoxesSuccess({ boxes })
			]),
			catchError(() => [loadBoxesError()])
		)
	);

	loadBox$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadBox),
			switchMap(({ id }) => this.boxService.getBox(id)),
			switchMap((box: Box) => [
				loadBoxSuccess({ box })
			]),
			catchError(() => [loadBoxError()])
		)
	);

	openBox$ = createEffect(() =>
		this.actions$.pipe(
			ofType(openBox),
			switchMap(({ box }) => this.boxService.openBox(box)),
			switchMap((data: any) => [
				setWonItem({ item: data.openBox.boxOpenings[0].itemVariant }),
				toggleWonItem()
			]),
			catchError(() => [openBoxError()])
		)
	);

	constructor(private actions$: Actions, private boxService: BoxService) {
	}
}
