import { Component, OnInit,OnDestroy } from '@angular/core';
import {todo_interface} from "./interface";
import {Observable, of} from "rxjs";
import { observable, autorun } from "mobx"
import {select, State, Store} from "@ngrx/store";
import {filter, map, take, toArray} from 'rxjs/operators';
import {TodoService} from "../todo-service.service"
import {updateItem,addItem,delItem,changeStatus} from "../actions/todo-action.actions";


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers:[TodoService]
})

export class CoreComponent {
  public importance: boolean = false;
  constructor(public store:Store<{todoReducer:todo_interface[]}>) {
  }


  addItem(name,start,end) {
    this.store.dispatch(addItem({todo: {
        name:name.value,
        start_time:start.value,
        end_time:end.value,
        importance:this.importance,
        checked: false
      }}))
  }

  importanceClick(){
    this.importance = !this.importance;
  }
}
