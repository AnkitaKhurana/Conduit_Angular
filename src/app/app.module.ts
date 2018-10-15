import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoggedInTabComponent } from './logged-in-tab/logged-in-tab.component';
import { LoggedOutTabComponent } from './logged-out-tab/logged-out-tab.component';
import { PageComponent } from './page/page.component';
import { MenuComponent } from './menu/menu.component';
import { TagsComponent } from './tags/tags.component';
import { ArticleComponent } from './article/article.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedComponent } from './feed/feed.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { UserService } from './shared/services/user.service';


const appRoutes: Routes = [
  {path:'',component:PageComponent},
  {path: 'page', component: PageComponent, children: [
    {path: 'feed', component: FeedComponent},
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegisterComponent },
  // {
  //   path: 'feed',
  //   component: ,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoggedInTabComponent,
    LoggedOutTabComponent,
    PageComponent,
    MenuComponent,
    TagsComponent,
    ArticleComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    FeedComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,

  ],
  providers: [ApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
