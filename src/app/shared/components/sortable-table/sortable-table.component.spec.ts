import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersApiService } from '../../../api/services/users-api.service';
import { TranslateGlPipe } from '../../../language/pipes/translate-gl.pipe';
import { LanguageService } from '../../../language/services/language.service';
import { TranslateGlService } from '../../../language/services/translate-gl.service';
import { ColumnTypeEnum } from '../../enums/column-type.enum';
import { Column } from '../../types/column.type';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ArraySortPipe } from './sort.pipe';
import { SortableTableComponent } from './sortable-table.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const TRANSLATIONS_CZ = require('../../../../assets/i18n/root/cz.json');
const dbData = require('../../../../../db.json');
const colsData: Array<Column> = [
  {
    rowKey: 'firstname',
    translateKey: 'USERDATA.FIRSTNAME',
    type: ColumnTypeEnum.TEXT,
    minWidth: 170,
    required: true,
  },
  {
    rowKey: 'secondname',
    translateKey: 'USERDATA.SECONDNAME',
    type: ColumnTypeEnum.TEXT,
    minWidth: 170,
    required: true,
  },
  {
    rowKey: 'birthday',
    translateKey: 'USERDATA.BIRTHDAY',
    type: ColumnTypeEnum.DATE,
    minWidth: 150,
    required: true,
  },
  {
    rowKey: 'email',
    translateKey: 'USERDATA.EMAIL',
    type: ColumnTypeEnum.EMAIL,
    minWidth: 250,
    required: true,
  },
  {
    rowKey: 'telephone',
    translateKey: 'USERDATA.TELEPHONE',
    type: ColumnTypeEnum.TELEPHONE,
    minWidth: 120,
    required: true,
  },
  {
    rowKey: 'height',
    translateKey: 'USERDATA.HEIGHT',
    type: ColumnTypeEnum.NUMBER,
    minWidth: 110,
    required: true,
  },
  {
    rowKey: 'weight',
    translateKey: 'USERDATA.WEIGHT',
    type: ColumnTypeEnum.NUMBER,
    minWidth: 110,
    required: true,
  },
];

describe('SortableTableComponent', () => {
  let component: SortableTableComponent;
  let fixture: ComponentFixture<SortableTableComponent>;

  let translate: TranslateService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortableTableComponent, ArraySortPipe, TranslateGlPipe],
      imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        //	SweetAlert2Module.forRoot()
      ],
      providers: [UsersApiService, TranslateGlService, LanguageService],
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    httpMock = TestBed.get(HttpTestingController);
    translate.use('cz');
    httpMock.expectOne('/assets/i18n/cz.json').flush(TRANSLATIONS_CZ);
    httpMock.verify();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableTableComponent);
    component = fixture.componentInstance;
    component.colsData = colsData;
    component.rowsData = dbData.users;
    component.canAdd = false;
    component.canEdit = false;
    component.canDelete = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check internalization', () => {
    expect(
      fixture.debugElement.query(By.css('.addButton')).nativeElement.title
    ).toEqual(TRANSLATIONS_CZ.TABLE.ADDROW);
  });

  it('check count cols in the table', () => {
    expect(
      fixture.debugElement.queryAll(By.css('th')).length ==
        component.colsData.length + 1
    ).toBeTruthy();
  });

  it('check count rows in the table', () => {
    expect(
      fixture.debugElement.queryAll(By.css('tr')).length ==
        component.rowsData.length + 1
    ).toBeTruthy();
  });
});
