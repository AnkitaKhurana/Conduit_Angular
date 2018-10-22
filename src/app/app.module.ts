import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { NavbarComponent } from './common-components/navbar/navbar.component';
import { LoggedInTabComponent } from './common-components/logged-in-tab/logged-in-tab.component';
import { LoggedOutTabComponent } from './common-components//logged-out-tab/logged-out-tab.component';
import { PageComponent } from './common-components/page/page.component';
import { MenuComponent } from './common-components/menu/menu.component';
import { TagsComponent } from './tag-components/tags/tags.component';
import { ArticleComponent } from './article-components/article/article.component';
import { FooterComponent } from './common-components//footer/footer.component';
import { HeaderComponent } from './common-components//header/header.component';
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { ArticlesComponent } from './article-components/articles/articles.component';
import { ProfileComponent } from './profile-components/profile/profile.component';
import { ArticlePageComponent } from './article-components/article-page/article-page.component';
import { CommentsComponent } from './comment-components/comments/comments.component';
import { CommentComponent } from './comment-components/comment/comment.component';
import { TagPageComponent } from './tag-components/tag-page/tag-page.component';
import { MyFeedComponent } from './article-components/my-feed/my-feed.component';
import { MyFavoritesComponent } from './article-components/my-favorites/my-favorites.component';
import { MyArticlesComponent } from './article-components/my-articles/my-articles.component';
import { ArticleEditorComponent } from './article-components/article-editor/article-editor.component';
import { CommentEditorComponent } from './comment-components/comment-editor/comment-editor.component';
import { UserComponent } from './user-components/user/user.component';
import { DatePipe } from '@angular/common';


const appRoutes: Routes = [
  { path: '', component: PageComponent },
  {
    path: 'page', component: PageComponent, children: [
      { path: 'articles', component: ArticlesComponent },
      { path: 'tag/:tagString', component: TagPageComponent },
      { path: 'myFeed', component: MyFeedComponent, canActivate : [AuthGuard] },
      { path: 'myFavorites', component: MyFavoritesComponent , canActivate : [AuthGuard]},
      { path: 'myArticles', component: MyArticlesComponent, canActivate : [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article/:slug', component: ArticlePageComponent },
  { path: 'addArticle', component: ArticleEditorComponent, canActivate : [AuthGuard] },
  { path: 'editArticle', component: ArticleEditorComponent,canActivate : [AuthGuard] },
  { path: 'me', component: UserComponent , canActivate : [AuthGuard]},
  { path: 'profile/:username', component: ProfileComponent },
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
    ArticlesComponent,
    ProfileComponent,
    ArticlePageComponent,
    CommentsComponent,
    CommentComponent,
    TagPageComponent,
    MyFeedComponent,
    MyFavoritesComponent,
    MyArticlesComponent,
    ArticleEditorComponent,
    CommentEditorComponent,
    UserComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,

  ],
  providers: [ApiService, UserService, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
