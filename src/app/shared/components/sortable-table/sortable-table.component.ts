import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { LanguageService } from '../../../language/services/language.service';
import { TranslateGlService } from '../../../language/services/translate-gl.service';
import { ActionTableEnum } from '../../enums/action-table.enum';
import { ColumnTypeEnum } from '../../enums/column-type.enum';
import { IBdData } from '../../interfaces/bd-data.interface';
import { ChangeTableData } from '../../types/change-table-data.type';
import { Column } from '../../types/column.type';
import { MaxDateValueValidator, MinDateValueValidator } from '../../validators/date-validator';

@Component({
  selector: 'bsc-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableTableComponent implements OnInit, OnDestroy {
  @Input() colsData: Array<Column> = [];
  @Input() rowsData: Array<IBdData> = [];

  @Input() canAdd = false;
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Input() imgAdd = 'assets/imgs/plusblue48.png';
  @Input() imgEdit = 'assets/imgs/editblue16.png';
  @Input() imgDelete = 'assets/imgs/delete16.png';
  @Input() imgClose = 'assets/imgs/close.png';
  @Output() onChangeData = new EventEmitter<ChangeTableData>();

  angForm: FormGroup;
  sortColName = '';
  sortDown = true;
  selectedRow;
  currEditRowData = null;
  private subscription = new Subscription();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private translateService: TranslateGlService, private languageService: LanguageService) {
    this.subscription.add(
       this.languageService.getLanguage$().pipe(debounceTime(0)).subscribe(() => {
        this.cdr.markForCheck();
       })
     );

  }

  ngOnInit() {
    this.createForm();
  }

  trackByRowKeyFn(_, item:Column){
    return item.rowKey;
  }

  trackByIdFn(_, item:IBdData){
    return item.id;
  }

  onColClick(colName: string) {
    if (this.sortColName == colName) {
      this.sortDown = !this.sortDown;
    } else {
      this.sortColName = colName;
      this.sortDown = true;
    }
  }

  hideArrow(colName: string, down: boolean): boolean {
    return !(this.sortColName == colName && this.sortDown == down);
  }

  getMinWidth(colData: Column): number {
    if (colData && colData.minWidth) {
      return colData.minWidth;
    }
    return 0;
  }

  getRowClass(colData: Column, rowData: IBdData = null) {
    return (
      (colData && colData.type ? colData.type : 'buttons') +
      (rowData &&
        this.selectedRow &&
      (this.selectedRow == rowData ||
        (rowData.id && rowData.id == this.selectedRow.id))
        ? ' selectedRow'
        : '')
        );
      }

  onRowMouseDown(rowData: IBdData) {
    this.selectedRow = rowData;
  }

  onAddClick() {
    this.currEditRowData = null;
    this.createForm();
  }

  onEditClick(rowData: IBdData) {
    this.currEditRowData = rowData;
    this.createForm(rowData);
  }

  onDeleteClick(rowData: IBdData) {
    swal.fire({
      title: this.translateService.getInstance().instant('TABLE.DELETEROWQ'),
      text: this.translateService.getInstance().instant('TABLE.CANNOTUNDONE'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translateService.getInstance().instant('TABLE.YES_REMOVE'),
      cancelButtonText: this.translateService.getInstance().instant('TABLE.CANCEL'),
    }).then((result) => {
      if (result.value) {
        let obj: ChangeTableData = {
          action: ActionTableEnum.DELETE,
          newValue: null,
          prevValue: rowData,
        };
        this.onChangeData.emit(obj);
      }
    });
  }

  addZero(value: number, len = 2) {
    var str = value.toString();
    var zeros = '';
    var strLen = str.length;
    if (strLen < len) {
      for (let i = 0; i < len - strLen; i++) {
        zeros += '0';
      }
    }
    return zeros + str;
  }

  transformRowDataValue(colData: Column, rowData: IBdData) {
    if (colData.type == ColumnTypeEnum.DATE && rowData[colData.rowKey]) {
      let date = new Date(rowData[colData.rowKey]);
      return `${this.addZero(date.getDate())}.${this.addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
    }
    return rowData[colData.rowKey];
  }

  createValidatorsArray(colData: Column): [] {
    var arr: any = [];
    if (colData.required) {
      arr.push(Validators.required);
    }
    if (colData.type == ColumnTypeEnum.EMAIL) {
      arr.push(Validators.email);
    }
    if (
      colData.type == ColumnTypeEnum.NUMBER &&
      !isNullOrUndefined(colData.minValue)
      ) {
        arr.push(Validators.min(colData.minValue as number));
    }
    if (
      colData.type == ColumnTypeEnum.NUMBER &&
      !isNullOrUndefined(colData.maxValue)
      ) {
      arr.push(Validators.max(colData.maxValue as number));
    }
    if (
      colData.type == ColumnTypeEnum.DATE &&
      !isNullOrUndefined(colData.minValue)
      ) {
        arr.push(MinDateValueValidator(colData.minValue as Date));
      }
    if (
      colData.type == ColumnTypeEnum.DATE &&
      !isNullOrUndefined(colData.maxValue)
    ) {
      arr.push(MaxDateValueValidator(colData.maxValue as Date));
    }

    return arr;
  }

  createForm(rowData: IBdData = null) {
    let obj = {};
    for (let colData of this.colsData) {
      obj[colData.rowKey] = [
        rowData ? rowData[colData.rowKey] : '',
        this.createValidatorsArray(colData),
      ];
    }
    this.angForm = this.fb.group(obj);
  }

  onSaveBtnClick() {
    let obj: ChangeTableData = {
      action: this.currEditRowData ? ActionTableEnum.EDIT : ActionTableEnum.NEW,
      prevValue: this.currEditRowData,
      newValue: this.angForm.value,
    };

    this.onChangeData.emit(obj);
    this.currEditRowData = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
