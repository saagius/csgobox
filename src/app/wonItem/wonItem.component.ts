import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppState } from '../store/app.state';
import { WonItem } from './wonItem';
import { selectWonItem, selectWonItemShown } from '../store/wonItem/wonItem.selectors';
import { toggleWonItem } from '../store/wonItem/wonItem.actions';

@Component({
	selector: 'app-won-item',
	template: `
        <div class="won-item" *ngIf="$wonItemShown | async;">
	        <div class="won-item-wrapper" *ngIf="$wonItem | async as wonItem else loading">
		        <div class="hide-won-item" (click)="hideWonItem()">X</div>
	            <div class="won-item-details">
                    <h4>You just won this item</h4>
	                <div class="won-item-name">{{wonItem.name}}</div>
	                <div class="won-item-value">
	                    <img src="https://www-staging.csgoroll.com/en/assets/icons/coins.svg" />
		                {{wonItem.value}}
	                </div>
	            </div>
            </div>
        </div>
        <ng-template #loading>
            <div class="won-item-loading">
                Loading...
            </div>
        </ng-template>
	`,
	styleUrls: ['./wonItem.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WonItemComponent implements OnInit {
	$wonItem: Observable<WonItem|undefined> = this.store.select(selectWonItem);
	$wonItemShown: Observable<boolean> = this.store.select(selectWonItemShown);

	constructor(private store: Store<AppState>, private router: Router) {
	}

	ngOnInit(): void {
	}

	hideWonItem() {
		this.store.dispatch(toggleWonItem());
	}
}
