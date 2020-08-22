import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";
import {todo_interface} from "./view/interface";
import {State} from "@ngrx/store";
import {last, map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {updateItem,addItem,delItem,changeStatus} from "src/app/actions/todo-action.actions";
import {Store} from "@ngrx/store";

@Injectable()
export class TodoService {
  public toDoList: Observable<any[]>;
  public show: Observable<todo_interface[]>;
  public nothing : Observable<todo_interface[]>;
  private subscription: Subscription;
  stateCtrl = new FormControl()
  constructor(public firebasedb: AngularFirestore,
              public store:Store<{todoReducer:todo_interface[]}>,
              ) {
    const collection = this.firebasedb.collection('/nolan')
    //GET
    this.toDoList = collection.valueChanges();
    this.show = this.toDoList;
    this.nothing = this.show.pipe(map(items => items));
    this.subscription = this.nothing.subscribe(val => this.updateItem(val));
    //
  }
  updateItem(val:todo_interface[]){
    console.log(val);
    this.store.dispatch(updateItem({todoArray: val}));
  }
  addItem(){

  }
  delItem(){

  }
  changeStatus(){

  }
}
