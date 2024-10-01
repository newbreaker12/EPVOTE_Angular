import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-manager-group-create',
  templateUrl: './manager-group-create.component.html',
  styleUrls: ['./manager-group-create.component.css']
})
export class ManagerGroupCreateComponent implements OnInit {

  id=""
  name = "";
  readableId = "";

  constructor(public client : ApiclientService,
    private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.client.getGroup(this.id).subscribe(response =>
        {
          this.name = response.data.name,
          this.readableId = response.data.readableId
        });
    }
  }

  public create(){
    const body = { id: Number(this.id), name: this.name, readableId: this.readableId}
    this.client.createGroup(body)
    .subscribe(response =>{
      if(response.data === 'ok') {
        window.open("/groups", "_self");
    }})
  }
  public edit(){
    const body = { id: Number(this.id), name: this.name, readableId: this.readableId}
    this.client.editGroup(body)
    .subscribe(response =>{
      if(response.data) {
        window.open("/groups", "_self");
    }})
  }

}
