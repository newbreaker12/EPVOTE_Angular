import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { range } from 'rxjs';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  id = ''
  articleId = "";
  description = "";
  name = "";
  from = "";
  to = "";

  constructor(public client : ApiclientService, 
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get("id");
    
  }

  public createSession(){
    const body = { name: this.name, description: this.description, articleId: Number(this.articleId), to: this.to, from: this.from }
    this.client.createSession(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open("/", "_self");
    }})
  }
}
