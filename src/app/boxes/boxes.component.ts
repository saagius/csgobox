import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.state';
import { selectBoxIds } from '../store/box/box.selectors';
import { loadBoxes } from '../store/box/box.actions';
import { BoxRootState } from '../store/box/box.reducer';

@Component({
	selector: 'app-boxes',
	template: `
        <div class="boxes">
            <div class="boxes-wrapper">
                <app-box *ngFor="let boxId of $boxIds | async; trackBy: trackById"
                        [boxId]="boxId"
                        class="box-wrapper"
                ></app-box>
            </div>
        </div>
	`,
	styleUrls: ['./boxes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxesComponent implements OnInit {
	hasBoxes = false;
	$boxIds = this.store.select(selectBoxIds);

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store.dispatch(loadBoxes());

		this.store
			.pipe(
				map((state: BoxRootState) => selectBoxIds(state))
			)
			.subscribe((boxIds: string[]) => {
				this.hasBoxes = boxIds.length > 0;
			});
	}

	trackById(index: number, id: string): string {
		return id;
	}
}
