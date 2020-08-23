import { createAction, props } from '@ngrx/store';
import {todo_interface} from "../view/interface";

export const delItem = createAction(
  '[View] Del Item',
  props<{name:String}>()
);

export const addItem = createAction(
  '[View] Add Item',
  props<{todo: todo_interface}>()
);

export const updateItem = createAction(
  '[View] Update Data',
  props<{todoArray: todo_interface[]}>()
);

export const changeStatus = createAction(
  '[View] change Status',
  props<{name: String}>()
);



