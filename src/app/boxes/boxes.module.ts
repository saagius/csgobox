import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxesComponent } from './boxes.component';
import { BoxModule } from '../box/box.module';

@NgModule({
	declarations: [BoxesComponent],
	imports: [
		CommonModule,
		BoxModule
	],
	exports: [BoxesComponent]
})
export class BoxesModule {
}
