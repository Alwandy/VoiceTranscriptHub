import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recording-create',
  templateUrl: './recording-create.component.html',
  styleUrls: ['./recording-create.component.sass']
})
export class RecordingCreateComponent implements OnInit {
  reactiveForm: FormGroup;
  loadAPI: Promise<any>;

  constructor(private fb: FormBuilder) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });

   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      title:   ['']
    });
  }

  public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }
    if (!isFound) {
      var dynamicScripts = ["http://localhost:4200/assets/app.js", "http://localhost:4200/assets/recorder.js"];

      for (var i = 0; i < dynamicScripts .length; i++) {
          let node = document.createElement('script');
          node.src = dynamicScripts [i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

}
