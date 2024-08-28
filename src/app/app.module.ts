import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./Pages/dashboard/dashboard.component";
import { LoginComponent } from "./Pages/login/login.component"; // Import the LoginComponent
import { AppRoutingModule } from "./app-routing.module";
import { CreateComponent } from "./Pages/create-edit-article/create.component";
import { CreateSessionComponent } from "./Pages/create-session/create-session.component";
import { ArticleDetailsComponent } from "./Pages/article-details/article-details.component";
import { CreateSubarticleComponent } from "./Pages/create-subarticle/create-subarticle.component";
import { ManagerGroupsComponent } from "./Pages/manager-groups/manager-groups.component";
import { ManagerUsersComponent } from "./Pages/manager-users/manager-users.component";
import { ManagerUsersCreateComponent } from "./Pages/manager-users-create/manager-users-create.component";
import { ManagerGroupCreateComponent } from "./Pages/manager-group-create/manager-group-create.component";
import { HistoryComponent } from "./Pages/history/history.component";
import { StatisticsComponent } from "./Pages/statistics/statistics.component";
import { PieComponent } from "./Pages/pie/pie.component";
import { TokenInterceptor } from "./token-interceptor";

import { CanvasJSAngularChartsModule } from "@canvasjs/angular-charts";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: "", component: DashboardComponent, data: { title: "Dashboard" } },
  { path: "groups", component: ManagerGroupsComponent, data: { title: "Manage Groups" } },
  { path: "groups/create", component: ManagerGroupCreateComponent, data: { title: "Create Group" } },
  { path: "groups/edit/:id", component: ManagerGroupCreateComponent, data: { title: "Edit Group" } },
  { path: "users", component: ManagerUsersComponent, data: { title: "Manage Users" } },
  { path: "users/create", component: ManagerUsersCreateComponent, data: { title: "Create User" } },
  { path: "users/edit/:id", component: ManagerUsersCreateComponent, data: { title: "Edit User" } },
  { path: "login", component: LoginComponent, data: { title: "Login" } },
  { path: "session/create", component: CreateSessionComponent, data: { title: "Create Session" } },
  { path: "session/create/:id", component: CreateSessionComponent, data: { title: "Edit Session" } },
  { path: "article/create", component: CreateComponent, data: { title: "Create Article" } },
  { path: "article/edit/:id", component: CreateComponent, data: { title: "Edit Article" } },
  { path: "article/:id", component: ArticleDetailsComponent, data: { title: "Article Details" } },
  { path: "history", component: HistoryComponent, data: { title: "History" } },
  { path: "statistics", component: StatisticsComponent, data: { title: "Statistics" } },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent, // Add LoginComponent to declarations
    CreateComponent,
    CreateSessionComponent,
    ArticleDetailsComponent,
    CreateSubarticleComponent,
    ManagerGroupsComponent,
    ManagerUsersComponent,
    ManagerUsersCreateComponent,
    ManagerGroupCreateComponent,
    HistoryComponent,
    StatisticsComponent,
    PieComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CanvasJSAngularChartsModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    ToastrModule.forRoot({ closeButton: true }),
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
