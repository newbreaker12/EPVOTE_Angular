import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { MyComponentComponent } from './my-component/my-component.compponent';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatSelectModule, MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Pages/login/login.component';
import { CreateComponent } from './Pages/create-edit-article/create.component';
import { CreateSessionComponent } from './Pages/create-session/create-session.component';
import { ArticleDetailsComponent } from './Pages/article-details/article-details.component';
import { CreateSubarticleComponent } from './Pages/create-subarticle/create-subarticle.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'session/create', component: CreateSessionComponent },
  { path: 'session/create/:id', component: CreateSessionComponent },
  { path: 'article/create', component: CreateComponent },
  { path: 'article/edit/:id', component: CreateComponent },
  { path: 'article/:id', component: ArticleDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CreateComponent,
    CreateSessionComponent,
    ArticleDetailsComponent,
    CreateSubarticleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent
  ],
  entryComponents: [CreateSubarticleComponent],
})
export class AppModule { }
