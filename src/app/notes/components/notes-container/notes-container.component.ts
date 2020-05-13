import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Note } from '../../../api/interfaces/note.interface';
import { NotesApiService } from '../../../api/services/notes-api.service';
import { ActionTableEnum } from '../../../shared/enums/action-table.enum';
import { ColumnTypeEnum } from '../../../shared/enums/column-type.enum';
import { ChangeTableData } from '../../../shared/types/change-table-data.type';
import { Column } from '../../../shared/types/column.type';
@Component({
  selector: 'bsc-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesContainerComponent{
  colsData: Array<Column> = [
    {
      rowKey: 'title',
      translateKey: 'NOTES.TITLE',
      type: ColumnTypeEnum.TEXT,
      minWidth: 170,
      required: true,
    },
  ];
  rowsData$ = this.notesApiService.getData$();
  constructor(private notesApiService: NotesApiService) {}

  onChangeData(event: ChangeTableData) {
    if (event.action === ActionTableEnum.EDIT) {
      this.notesApiService.editRow$(event.prevValue.id.toString(), event.newValue as Note);
    } else if (event.action === ActionTableEnum.NEW) {
      this.notesApiService.newRow$(event.newValue as Note);
    } else if (event.action === ActionTableEnum.DELETE) {
      this.notesApiService.deleteRow$(event.prevValue.id.toString());
    }
  }
}
