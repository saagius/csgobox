import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Box } from './box';
import { AppState } from '../store/app.state';
import { selectBox } from '../store/box/box.selectors';
import { BoxRootState } from '../store/box/box.reducer';
import { openBox } from '../store/box/box.actions';
import { Router } from '@angular/router';

@Component({
	selector: 'app-box',
	template: `
        <div class="box" *ngIf="box" (click)="goToBoxDetail(box.id)">
            <div class="box-details">
	            <div class="box-image">
                    <img [src]="box.iconUrl" [alt]="box.name" loading="lazy" (error)="handleMissingImage($event)">
                    <div class="box-image-not-found" *ngIf="!imageFound">Image not available</div>
	            </div>
                <div class="box-name">{{box.name}}</div>
                <div class="box-cost">
                    <img src="https://www-staging.csgoroll.com/en/assets/icons/coins.svg" />
	                {{box.cost}}
                </div>
                <a class="box-view-link" [routerLink]="['/box', box.id]" routerLinkActive="active">View</a>
	            <button (click)="triggerOpenBox($event, box)">Open Box</button>
            </div>
        </div>
        <div class="box-loading" *ngIf="!box">Loading...</div>
	`,
	styleUrls: ['./box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnInit {
	@Input() boxId?: string;
	box?: Box;
	imageFound = true;

	constructor(private store: Store<AppState>, private router: Router) {
	}

	ngOnInit(): void {
		if (this.boxId) {
			const id = this.boxId;

			this.store
				.pipe(
					map((state: BoxRootState) => selectBox(state, { id }))
				)
				.subscribe((box: Box) => {
					if (box) {
						this.box = box;
					}
				});
		}
	}

	handleMissingImage(event: Event): void {
		(event.target as HTMLImageElement).style.display = 'none';
		this.imageFound = false;
	}

	goToBoxDetail(boxId: string) {
		this.router.navigate(['/box', boxId]);
	}

	triggerOpenBox($event: MouseEvent, box: Box) {
		$event.preventDefault();
		$event.stopImmediatePropagation();

		this.store.dispatch(openBox({ box }))
	}
}
