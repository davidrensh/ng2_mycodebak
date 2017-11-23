import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as firebase from "firebase";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";
@Component({
  selector: "app-ctl-upload-img",
  templateUrl: "./ctl-upload-img.component.html",
  styleUrls: ["./ctl-upload-img.component.scss"]
})
export class CtlUploadImgComponent implements OnInit {
  @Input() nodeid: any;
  basePath = "";
  uploadsRef: any;
  uploads: any;
  showProgress = false;

  selectedFiles: FileList;
  currentUpload: any;

  constructor(private db: AngularFireDatabase) {}
  ngOnInit() {
    this.basePath = this.nodeid;
    // console.log('333=', this.basePath);
    this.uploads = this.getUploads();
    // this.uploads.subscribe(() => (this.showProgress = false));
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = { file: file };
    this.pushUpload(this.currentUpload);
  }

  uploadMulti() {
    let files = this.selectedFiles;
    if (_.isEmpty(files) || files.length > 10) {
      return;
    }

    let filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      this.currentUpload = { file: files[idx] };
      this.pushUpload(this.currentUpload);
    });
  }
  getUploads() {
    this.uploads = this.db
      .list(this.basePath)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const $key = a.payload.key;
          // console.log($key);
          return { $key, ...data };
        });
      });
    return this.uploads;
  }

  deleteUpload(upload: any) {
    // console.log("aaa=", upload.$key);
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }
  deleteAll() {
    // // console.log("delete all", this.basePath);

    this.db
      .list(this.basePath)
      .valueChanges()
      .subscribe(p => {
        p.forEach(k => {
          // console.log("delete all", k,k.name);
          this.deleteFileStorage(k.name);
        });
      });
    this.uploads.forEach(u => {
      this.deleteFileData(u.$key);
    });
  }
  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: any) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = snap.bytesTransferred / snap.totalBytes * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
        return undefined;
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: any) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`${this.basePath}/${name}`)
      .delete()
      .then(() => {})
      .catch(function(error) {
        // console.log("!!!!=", error);
        // Uh-oh, an error occurred!
      });
  }
}
//   constructor() { }
//   deleteUpload(upload) {
//     this.upSvc.deleteUpload(this.upload)
//   }
//   ngOnInit() {
//   }
//   upload() {
//     // console.log(e);
//     // Create a root reference

//     // const success = false;
//     // This currently only grabs item 0, TODO refactor it to grab them all
//     for (const selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
//       if(selectedFile.size > 20480){
//         console.log('The file size cannot large than 20k!');
//         return;
//       }
//       if (selectedFile === undefined) {
//         return;
//       }
//       // this.contestFile = selectedFile;
//       // // Make local copies of services because "this" will be clobbered
//       // this.imagePath = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(selectedFile)));
//     }

//   }
// }
