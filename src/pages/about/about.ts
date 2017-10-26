import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
peoplelist: AngularFireList<any>;
  constructor(public navCtrl: NavController , public db:AngularFireDatabase, ) {
    this.peoplelist=db.list('people')
  }
  createEmployee(name,lname,age,job,employeeId){
    this.peoplelist.push({
      key_id: new Date().getTime(),
            name : name,
            lname :lname,
            age: age,
            job: job,
            employeeId : employeeId
      
          }).then(newPerson => {

            this.navCtrl.push(HomePage);
          })
  }

}

  
  
