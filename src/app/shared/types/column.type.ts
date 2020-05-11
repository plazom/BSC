import { ColumnTypeEnum } from '../enums/column-type.enum';

export type Column = {
  rowKey: string,
  translateKey: string,
  type: ColumnTypeEnum,
  minWidth?: number,
  requared?: boolean,
  minValue?: number | Date,
  maxValue?: number | Date,
};
