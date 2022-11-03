import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Box } from '../box/box';
import { AppState } from '../store/app.state';
import { selectBox } from '../store/box/box.selectors';
import { loadBox, openBox } from '../store/box/box.actions';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-box-detail',
	template: `
		<div class="go-back" (click)="goBack()">< Back</div>
        <div class="boxDetail" *ngIf="$box | async as box; else loading">
            <div class="box-details">
	            <div class="box-image">
                    <img [src]="box.iconUrl" [alt]="box.name" loading="lazy" (error)="handleMissingImage($event)">
                    <div class="box-image-not-found" *ngIf="!imageFound">Image not available</div>
	            </div>
	            <div class="box-info">
	                <div class="box-name">{{box.name}}</div>
		            <div class="box-to-open" (click)="triggerOpenBox($event, box)">
			            Open Box
                        <img src="https://www-staging.csgoroll.com/en/assets/icons/coins.svg" />
                        {{box.cost}}
		            </div>
                </div>
            </div>
        </div>
        <ng-template #loading>
            <div class="box-loading">Loading...</div>
        </ng-template>
	`,
	styleUrls: ['./boxDetail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxDetailComponent implements OnInit {
	boxId?: string;
	$box?: Observable<Box>;
	imageFound = true;

	constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
	}

	ngOnInit(): void {
		this.boxId = this.route.snapshot.paramMap.get('id')!;
		this.$box = this.store.select((state) => selectBox(state, {
			id: this.boxId!
		}));
		this.store.dispatch(loadBox({
			id: this.boxId
		}));
	}

	handleMissingImage(event: Event): void {
		(event.target as HTMLImageElement).style.display = 'none';
		this.imageFound = false;
	}

	triggerOpenBox($event: MouseEvent, box: Box) {
		$event.preventDefault();

		this.store.dispatch(openBox({ box }))
	}

	goBack() {
		this.router.navigate(['/boxes']);
	}
}
