import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList ,AngularFireAction } from 'angularfire2/database';
 
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsRef: AngularFireList<any>;
employees: Observable<any[]>;


items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>; //added
size$: BehaviorSubject<string|null>;//added


constructor(public navCtrl: NavController, af: AngularFireDatabase  ) {
 
  this.itemsRef =  af.list('/people')
   this.employees = this.itemsRef.valueChanges() ;

  
//added
   this.size$ = new BehaviorSubject(null); //added
   this.items$ = this.size$.switchMap(size =>  //added
     af.list('/people', ref =>  //added
       size ? ref.orderByChild('size').equalTo(size) : ref  //added
     ).snapshotChanges() //added
   );
 
   this.items$.subscribe(actions => {
    actions.forEach(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
    })  ; 
 
  });
}
    

 
 deleteEmployee(id){
   this.itemsRef.remove(id);
 }
}
