import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagComponent } from './flag.component';

describe('FlagComponent', () => {
  let component: FlagComponent;
  let fixture: ComponentFixture<FlagComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagComponent);
    component = fixture.componentInstance;
    component.flag.imgDown = '../../assets/imgs/united_kingdom_heart_icon_64.png';
    component.flag.imgUp = '../../assets/imgs/united_kingdom_round_icon_64.png';
    component.flag.selected = Math.random()>0.5;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check img visibiliti and URL', () => {
    let index = component.flag.selected ? 0 : 1;
    let nativeElement = fixture.debugElement.childNodes[index]['nativeElement'];
    expect(nativeElement.hasAttribute('hidden') && nativeElement.getAttribute('src') == (index == 0 ? component.flag.imgUp : component.flag.imgDown) ).toBeTruthy();
  });

});
