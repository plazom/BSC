import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { ActionTableEnum } from '../../enums/action-table.enum';
import { ColumnTypeEnum } from '../../enums/column-type.enum';
import { BdData } from '../../interfaces/bd-data.interface';
import { ChangeTableData } from '../../types/change-table-data.type';
import { Column } from '../../types/column.type';
import { MaxDateValueValidator, MinDateValueValidator } from '../../validators/date-validator';

@Component({
  selector: 'bsc-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableTableComponent implements OnInit {
  @Input() colsData: Array<Column> = [];
  @Input() rowsData: Array<BdData> = [];

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

  constructor(private fb: FormBuilder, private translateService: TranslateService) {}
  ngOnInit() {
    this.createForm();
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

  getRowClass(colData: Column, rowData: BdData = null) {
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

  onRowMouseDown(rowData: BdData) {
    this.selectedRow = rowData;
  }

  onAddClick() {
    this.currEditRowData = null;
    this.createForm();
  }

  onEditClick(rowData: BdData) {
    this.currEditRowData = rowData;
    this.createForm(rowData);
  }

  onDeleteClick(rowData: BdData) {
    swal.fire({
      title: this.translateService.instant('TABLE.DELETEROWQ'),
      text: this.translateService.instant('TABLE.CANNOTUNDONE'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translateService.instant('TABLE.YES_REMOVE'),
      cancelButtonText: this.translateService.instant('TABLE.CANCEL'),
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

  transformRowDataValue(colData: Column, rowData: BdData) {
    if (colData.type == ColumnTypeEnum.DATE && rowData[colData.rowKey]) {
      let date = new Date(rowData[colData.rowKey]);
      return (
        this.addZero(date.getDate()) +
        '.' +
        this.addZero(date.getMonth() + 1) +
        '.' +
        date.getFullYear()
      );
    }
    return rowData[colData.rowKey];
  }

  createValidatorsArray(colData: Column): [] {
    var arr: any = [];
    if (colData.requared) {
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

  createForm(rowData: BdData = null) {
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
}