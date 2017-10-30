import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseAuth} from 'angularfire2';
import { RoleService } from '../role.service';
@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {
  menuMain: any = {
    'Home': ['Weld Entry', 'Welder Entry', 'NDE Batch', 'AB83 Batch'],
    'Tools': ['Import', 'Export', 'Transfer Weld Data'],
    'Settings': ['Project', 'Child Weld Type', 'Interchangeable Process', 'Parameter', 'Parameter Type', 'Pipe Heat', 'Schedule', 'Schedule Wall Thickness', 'Line Class', 'Service Type', 'Welder Symbol', 'Welder Qualification', 'Weld Procedure'],
    'Reports': ['Report1'],
    'More': ['User Setup', 'My Profile', 'About', 'Signup']
  };
  public errmsg: string ="";

  fname: string;
  lname: string;
  email: string;
  phone: string;
  static uu: string;
  uid: string;
  constructor(public auth0: FirebaseAuth, public af: AngularFire, public rs: RoleService) {
  }

  ngOnInit() {
    this.errmsg = "";
  }
  setup() {
    let i: number = 0;
    let j: number = 0;
    for (var key in this.menuMain) {
      i++;
      // skip loop if the property is from prototype
      if (!this.menuMain.hasOwnProperty(key)) continue;
      // this.af.database.object("/menu/" + key).update({
      //   name: key
      // });
      var obj = this.menuMain[key];
      j = 0;
      //console.log("obj" + obj );
      for (var prop in obj) {
        j++;
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;
        this.af.database.object("/menu/" + i.toString() + key + "/" + j.toString() + obj[prop]).update({
          name: obj[prop]
        });
        //console.log(prop + " = " + obj[prop]);
      }
    }

  }

  signup(fname: string, lname: string, email: string, password: string, phone: string, address: string) {
    if (!password || password === undefined) password = this.rs.clearPhone(phone);
    let loginemail = this.rs.genEmail(phone);

    this.af.auth.createUser({
      email: loginemail,
      password: password
    }).then(function (authdata) {
      SignupComponent.uu = authdata.uid;
      localStorage.setItem('uid', authdata.uid);
      console.log("this.uid:" + SignupComponent.uu);
      
    }).catch(function (error) {
      console.log("err:" + JSON.stringify(error));
      if (error !== null) {
        switch (error.code) {
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            //this.errmsg = "The specified phone is invalid.";
            break;
          default:
            // this.errmsg = "Error creating user:" + error;
            console.log("Error creating user:", error);
            break;
          case "EMAIL_TAKEN":
            // this.errmsg = "The new user account cannot be created because the phone is already in use. Use the credential to setup store.";
            console.log("The new user account cannot be created because the phone is already in use. Use the credential to setup store.");
            break;
        }
      }
      return;
    });
  
    setTimeout(() => {
      //console.log("this.uid:" + SignupComponent.uu + this.uid);
      if (SignupComponent.uu !== undefined) {
        this.uid = SignupComponent.uu
      
        //localStorage.setItem('uid', "");
        this.af.auth.login({ email: loginemail, password: password }).then((authData) => {
          //this.uid = authData.uid;


          if (this.uid) {


            //console.log("44" + this.uid);
            this.af.database.object("/users/" + this.uid).update({
              uid: this.uid,
              email: email,
              fname: fname,
              lname: lname,
              phone: phone,
              role: 4,
              ownerid: this.uid,
              password: 'secret'
            });


            //this.parentRouter.navigateByUrl('/admin/Employees');

          }
        });
      }
    }, 2000);
    
    setTimeout(() => {
      this.errmsg = "";
    }, 5000);
  
  }
}
