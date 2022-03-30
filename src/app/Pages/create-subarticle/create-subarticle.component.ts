import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-create-subarticle',
  templateUrl: './create-subarticle.component.html',
  styleUrls: ['./create-subarticle.component.css']
})
export class CreateSubarticleComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateSubarticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public client : ApiclientService
  ) {}

  public save() {
    if (this.data.type === "save") {
      this.client.createSubArticle(this.data.subArticle)
      .subscribe(response =>{
        if(response.data === 'ok') {
          
    this.dialogRef.close();
      }})
    } else if (this.data.type === "update") {
      this.client.updateSubArticle(this.data.subArticle)
      .subscribe(response =>{
        if(response.data === 'ok') {
          
    this.dialogRef.close();
      }})
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
