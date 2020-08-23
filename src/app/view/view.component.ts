import { Component, OnInit,OnDestroy } from '@angular/core';
import {todo_interface} from "./interface";
import {Observable, of} from "rxjs";
import { observable, autorun } from "mobx"
import {select, State, Store} from "@ngrx/store";
import {filter, map, take, toArray} from 'rxjs/operators';
import {TodoService} from "../todo-service.service"
import {updateItem,addItem,delItem,changeStatus} from "../actions/todo-action.actions";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers:[TodoService]
})

export class ViewComponent {
  public todoArray: Array<todo_interface>;
  public show: Observable<todo_interface[]>;
  public checked: Observable<todo_interface[]>;
  public unchecked: Observable<todo_interface[]>;
  constructor(public store:Store<{todoReducer:todo_interface[]}>,
              public todoService: TodoService) {
    this.show = store.select("todoReducer");
    this.checked = this.show.pipe(
      map(items => items.filter(item => item.checked))
    );
    this.unchecked = this.show.pipe(
      map(items => items.filter(item => !item.checked))
    );
  }
  changeStatus(name,checked){
    this.store.dispatch(changeStatus({name:name}));
    this.todoService.changeStatus(name,checked);
  }

  delItem(name){
    this.store.dispatch(delItem({name: name}));
    this.todoService.delItem(name);
  }

}
