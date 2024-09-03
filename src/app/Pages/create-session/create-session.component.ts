import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiclientService } from 'src/app/apiclient.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  articleId: string = '';
  description: string = '';
  name: string = '';
  from: string = '';
  to: string = '';

  constructor(
    public client: ApiclientService,
    private readonly route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
  }

  public createSession() {
    const body = {
      name: this.name,
      description: this.description,
      articleId: Number(this.articleId),
      to: this.to,
      from: this.from
    };

    this.client.createSession(body)
      .subscribe(response => {
        if (response.data === 'ok') {
          this.toastrService.success('Session created successfully!');
          this.router.navigate(['/']);
        } else {
          this.toastrService.error(response.data);
        }
      }, error => {
        this.toastrService.error('Unable to define a session period', 'Error');
      });
  }
}
