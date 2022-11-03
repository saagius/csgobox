import { TestBed } from '@angular/core/testing';
import { BoxesComponent } from './boxes.component';

describe('BoxesComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				BoxesComponent
			]
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(BoxesComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
