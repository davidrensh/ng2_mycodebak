import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '../safehtml';
import { SharedService } from '../shared.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {
  title = '';
  location = '';
  des = '';
  shortDes = '';
  store = '';
  hist: any;
  mainDBApp: any;
  more = false;
  more2 = false;
  city = '';
  category = '';
  start: any;
  end: any;
  contestFile: any;
  imagePath: SafeUrl;
  folder = 'contests';
  imageFinalPath = '';
  constructor(private sanitizer: DomSanitizer, private af: AngularFireDatabase, public afAuth: AngularFireAuth,
    private safeHtml: SafeHtml, private ss: SharedService, private router: Router) {
    if (this.ss.storeSetting) {
      this.store = this.ss.storeSetting.name;
      const branches = this.af.list('/branches');
      branches.subscribe(p => {
        // console.log('aa', p);
        const b = p.filter((e) => {
          // console.log('bb', e, e.locationID, this.ss.employeeO.locationID);
          return e.locationID === this.ss.employeeO.locationID;
        });
        this.city = b[0].city ? b[0].city : '';
        this.category = b[0].category ? b[0].category : '';
      });
    } else {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }

    this.mainDBApp = this.ss.getMainDBApp();
    if (this.mainDBApp === null) {
      this.router.navigate(['/login']);
      return;
    } else {
      const res = this.mainDBApp.database().ref('/contests/').orderByChild('store')
        .equalTo(this.store);
      res.once('value', p => {
        // console.log('contests:', p);
        const ref = p.ref;
        this.hist = this.af.list(ref);
      });
    }
  }
  upload() {
    // console.log(e);
    // Create a root reference

    // const success = false;
    // This currently only grabs item 0, TODO refactor it to grab them all
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      if(selectedFile.size > 20480){
        console.log('The file size cannot large than 20k!');
        return;
      }
      if (selectedFile === undefined) {
        return;
      }
      this.contestFile = selectedFile;
      // Make local copies of services because "this" will be clobbered
      this.imagePath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(selectedFile)));
    }

  }
  delete() {

    // const storagePath = image.path;
    // const referencePath = `${this.folder}/images/` + image.$key;

    // // Do these as two separate steps so you can still try delete ref if file no longer exists

    // // Delete from Storage
    // this.mainDBApp.storage().ref().child(storagePath).delete()
    //   .then(
    //   () => { },
    //   (error) => console.error('Error deleting stored file', storagePath)
    //   );

    // // Delete references
    // this.mainDBApp.database.object(referencePath).remove();
  }

  isHtml() {
    if (this.des.indexOf('<') > -1 && this.des.indexOf('</') > -1) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
  }
  save() {
    // console.log('news1');
    if (this.ss.employeeO === undefined) { this.router.navigate(['/login']); }
    // const router = this.router;
    // const af = this.af;
    // const folder = this.folder;
    const storageRef = firebase.storage().ref();
    const path = `/${this.folder}images/${this.store}/${this.contestFile.name}`;
    const iRef = storageRef.child(path);
    iRef.put(this.contestFile).then((snapshot) => {
      console.log('Uploaded a blob or file! Now storing the reference at', `/${this.folder}images/`, this.contestFile.name);
      iRef.getDownloadURL().then(s => {
        this.imageFinalPath = s;
        this.realSave();
      });
    });

  }
  realSave(){
    const dt = Date.now();
    const ref = this.mainDBApp.database().ref('/contests/' + dt);
    // console.log('news12', this.ss.employeeO.id, this.store);
    const newsObj = this.af.object(ref).update({
      store: this.store,
      title: this.title,
      // location: this.location,
      short: this.shortDes,
      // des: this.des,
      image: this.imageFinalPath,
      start: this.start,
      end: this.end,
      city: this.city,
      category: this.category,
      publishedby: this.ss.employeeO.id,
    });
    // const refDetail = this.mainDBApp.database().ref('/newsdetail/' + dt);
    // // console.log('news12', this.ss.employeeO.id, this.store);
    // const newsObjDetail = this.af.object(refDetail).update({
    //   des: this.des,
    // });

    this.title = '';
    this.location = '';
    this.des = '';
    this.shortDes = '';
    this.start = null;
    this.end = null;
  }
  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ');
  }
}
