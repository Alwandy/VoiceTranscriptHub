import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
import { Router } from '@angular/router';


const Config: UploadParams = {
  sas: '?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2019-05-12T03:43:14Z&st=2019-05-11T19:43:14Z&spr=https,http&sig=Ps1U8c6YRxekATfBgiAEbWQkqJy7fNW2k8iu3HvL1jo%3D',
  storageAccount: 'audiostorage',
  containerName: 'audio'
};


@Component({
  selector: 'app-recording-create',
  templateUrl: './recording-create.component.html',
  styleUrls: ['./recording-create.component.sass']
})
export class RecordingCreateComponent implements OnInit {
  
  /** The upload config */
  config: UploadConfig
  /** The current percent to be displayed */
  percent: number
  reactiveForm: FormGroup;
  mediaRecorder;
  recording: boolean;
  public info: string;


  constructor(private fb: FormBuilder, private http: HttpClient, private blob: BlobService, private router: Router) {
    this.config = null
    this.percent = 0
  }

  async ngOnInit() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {this.mediaRecorder = new MediaRecorder(stream);});
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      title:   ['', Validators.required]
    });
  }
  

    // Call this when you want to start recording
    start() {
      if(this.reactiveForm.value.title != "") {
          this.info = null
          this.recording = true;
          this.mediaRecorder.start();
          const audioChunks = [];

          this.mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          var audiofile = new File([audioBlob], localStorage.getItem("id") + "-" + this.reactiveForm.value.title + ".wav");
          const baseUrl = this.blob.generateBlobUrl(Config, audiofile.name);
          this.config = {
            baseUrl: baseUrl,
            sasToken: Config.sas,
            blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
            file: audiofile,
            complete: () => {
              this.info = "Successfully uploaded recording... Please stand by for page to refresh"
              console.log('Completed');

              location.reload();
            },
            error: (err) => {
              this.info = "An error occurred";
              console.log('Error:', err);
            },
            progress: (percent) => {
              this.info = "In progress uploading: " + percent
            }
          };
          this.blob.upload(this.config);
      });
    } else {
      this.info = "Please put a title to be able start recording.."
    }
  }

  stopRecording(){
    this.mediaRecorder.stop();
  }
}
