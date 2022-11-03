import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonItemComponent } from './wonItem.component';

describe('WonItemComponent', () => {
	let component: WonItemComponent;
	let fixture: ComponentFixture<WonItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [WonItemComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WonItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
