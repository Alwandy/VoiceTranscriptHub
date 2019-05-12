import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Recording} from '../services/recording.model';


@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.sass']
})
export class RecordingComponent implements OnInit {
  recordings : Recording

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getRecordings().subscribe(result => { this.recordings = result});
  }

  private delete(id){
    this.api.deleteRecording(id).subscribe(result => {location.reload()})
  }


}
