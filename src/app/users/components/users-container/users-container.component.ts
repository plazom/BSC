import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '../../../api/interfaces/user.interface';
import { UsersApiService } from '../../../api/services/users-api.service';
import { ActionTableEnum } from '../../../shared/enums/action-table.enum';
import { ColumnTypeEnum } from '../../../shared/enums/column-type.enum';
import { ChangeTableData } from '../../../shared/types/change-table-data.type';
import { Column } from '../../../shared/types/column.type';
@Component({
  selector: 'bsc-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent {
  colsData: Array<Column> = [
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
      minValue: new Date('1900-01-01'),
      maxValue: new Date(),
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
      required: false,
    },
    {
      rowKey: 'height',
      translateKey: 'USERDATA.HEIGHT',
      type: ColumnTypeEnum.NUMBER,
      minWidth: 110,
      minValue: 40,
      maxValue: 260,
      required: true,
    },
    {
      rowKey: 'weight',
      translateKey: 'USERDATA.WEIGHT',
      type: ColumnTypeEnum.NUMBER,
      minWidth: 110,
      minValue: 1,
      maxValue: 360,
      required: true,
    },
  ];
  rowsData$ = this.usersApiService.getData$();
  constructor(private usersApiService: UsersApiService) {}

  onChangeData(event: ChangeTableData) {
    if (event.action === ActionTableEnum.EDIT) {
      this.usersApiService.editRow$(
        event.prevValue.id.toString(),
        event.newValue as User
      );
    } else if (event.action === ActionTableEnum.NEW) {
      this.usersApiService.newRow$(event.newValue as User);
    } else if (event.action === ActionTableEnum.DELETE) {
      this.usersApiService.deleteRow$(event.prevValue.id.toString());
    }
  }
}
