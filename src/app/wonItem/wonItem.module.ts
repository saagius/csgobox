import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WonItemComponent } from './wonItem.component';

@NgModule({
	declarations: [
		WonItemComponent
	],
	imports: [
		CommonModule
	],
	exports: [WonItemComponent]
})
export class WonItemModule {
}
