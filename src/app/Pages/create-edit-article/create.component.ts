import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  id = ''
  groupID = "";
  description = "";
  name = "";

  groups = [];
  groupName = "Select P G";

  constructor(public client : ApiclientService, 
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.client.getArticle(this.id).subscribe(response => 
        {
          this.name = response.data.name,
          this.groupID = response.data.groupID,
          this.description = response.data.description
          this.groupName = response.data.group.name
        });
    }
    this.getGroups()
  }

  public getGroups(){
    this.client.getGroups().subscribe(response => this.groups = response.data);
  }

  public createArticle(){
    const body = { name: this.name, description: this.description, groupsId: this.groupID }
    this.client.createArticle(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open("/", "_self");
    }})
  }
  public editArticle(){
    const body = { id: Number(this.id), description: this.description }
    this.client.editArticle(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open("/", "_self");
    }})
  }

}
