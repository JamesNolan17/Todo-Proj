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
  public collection: AngularFirestoreCollection<todo_interface>;

  constructor(public firebasedb: AngularFirestore,
              public store:Store<{todoReducer:todo_interface[]}>,
              ) {
    //GET
    this.collection = firebasedb.collection('/nolan')
    this.toDoList = this.collection.valueChanges();
    this.show = this.toDoList;
    this.nothing = this.show.pipe(map(items => items));
    this.subscription = this.nothing.subscribe(val => this.updateItem(val));
  }
  updateItem(val:todo_interface[]){
    console.log(val);
    this.store.dispatch(updateItem({todoArray: val}));
  }

  addItem(item:todo_interface){
    this.collection.doc(item.name).set(item);
  }
  delItem(name:string){
    this.collection.doc(name).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
  changeStatus(name,checked){
    this.collection.doc(name).update({
      checked: !checked
    }).then(function() {
      console.log("Document successfully edited!");
      console.log(name)
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
}
