import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxDetailComponent } from './boxDetail.component';

@NgModule({
	declarations: [
		BoxDetailComponent
	],
	imports: [
		CommonModule
	],
	exports: [BoxDetailComponent]
})
export class BoxDetailModule {
}
