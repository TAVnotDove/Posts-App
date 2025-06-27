import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from "@angular/common/http"
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { DeletePostComponent } from './pages/delete-post/delete-post.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostCommentsComponent } from './pages/post-comments/post-comments.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './pages/delete-comment/delete-comment.component';
import { ProfilePostsComponent } from './pages/profile-posts/profile-posts.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    PostsComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent,
    PageNotFoundComponent,
    PostDetailsComponent,
    PostCommentsComponent,
    EditCommentComponent,
    DeleteCommentComponent,
    ProfilePostsComponent,
    FooterComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
