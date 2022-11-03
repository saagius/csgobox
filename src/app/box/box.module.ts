import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxComponent } from './box.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		BoxComponent
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [BoxComponent]
})
export class BoxModule {
}
