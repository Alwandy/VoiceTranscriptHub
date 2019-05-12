import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
import { Router } from '@angular/router';
import {ApiService} from '../services/api.service';
import { first } from 'rxjs/operators'



const Config: UploadParams = {
  sas: '?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2019-12-07T21:55:06Z&st=2019-05-12T12:55:06Z&spr=https&sig=9Y6IWRIPhP9wbCo47ZHSTNVbcXx4bwAGDw40Kz6uZDU%3D',
  storageAccount: 'audiostorage',
  containerName: 'audio'
};

declare var MediaRecorder: any;


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
  recording: boolean;
  public info: string;


  constructor(private fb: FormBuilder, private http: HttpClient, private blob: BlobService, private router: Router, private api: ApiService) {
    this.config = null
    this.percent = 0
  }

  async ngOnInit() {
    this.createForm();
    await navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {MediaRecorder = new MediaRecorder(stream);});
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
          MediaRecorder.start();
          const audioChunks = [];

          MediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });

          MediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
          var audiofile = new File([audioBlob], localStorage.getItem("id") + "-" + this.reactiveForm.value.title + ".wav");
          const baseUrl = this.blob.generateBlobUrl(Config, audiofile.name);
          const recordingPayload = {
            title       :   this.reactiveForm.value.title,
            url         :   baseUrl,
            created_by  :   localStorage.getItem("id"),
            length      :   audioChunks.length
          };

          this.config = {
            baseUrl: baseUrl,
            sasToken: Config.sas,
            blockSize: 1024 * 64, // OPTIONAL, default value is 1024 * 32
            file: audiofile,
            complete: async () => {
              await this.uploadRecording(recordingPayload); 
              this.info = "Successfully uploaded recording... Please stand by for page to refresh";
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
    MediaRecorder.stop();
  }

  async uploadRecording(recordingPayload) {
    this.api.createRecording(recordingPayload).subscribe(result => location.reload());
  }
}
