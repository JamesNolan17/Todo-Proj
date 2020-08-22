import {todo_interface} from "../view/interface";
import {createReducer, on} from "@ngrx/store";
import {delItem, addItem, updateItem, changeStatus} from '../actions/todo-action.actions'
import {TodoService} from "../todo-service.service"
import {observable, Observable} from "rxjs";
import {of} from 'rxjs';
import {concatAll, map} from "rxjs/operators";
import {Component} from "@angular/core";

export const initialState: Array<todo_interface> = [{
  name: 'Loading',
  start_time: 'Loading',
  end_time: 'Loading',
  importance: true,
  checked: false}];


// Update the database whenever add/delete/check/uncheck the items
export const _todo_reducer = createReducer(
  initialState,
  on(updateItem, (state, action) => {
    return action.todoArray;
  }),
  on(delItem, (state, action) => {
    let array:todo_interface[] = [];
    console.log(action.name);
    for (var i = 0; i < state.length; i++){
      if (state[i].name == action.name){
        console.log("Found");
      }
      else {array.push(state[i])}
    }
    return array;
  }),
  on(addItem, (state, action) => {
      return [...state, action.todo];
  }),
  on(changeStatus, (state, action) => {

    let array:todo_interface[] = [];
    console.log(action.name);
    for (var i = 0; i < state.length; i++){
      if (state[i].name == action.name){
        array.push(
          { name: state[i].name,
            start_time: state[i].start_time,
            end_time: state[i].end_time,
            importance :state[i].importance,
            checked : !state[i].checked
          }
        )
        console.log("Found");
      }
      else {array.push(state[i])}
    }
    return array;
  })
);



export function todo_reducer(state, action) {
  return _todo_reducer(state, action);
}
