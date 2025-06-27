import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { DeletePostComponent } from './pages/delete-post/delete-post.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './pages/delete-comment/delete-comment.component';
import { ProfilePostsComponent } from './pages/profile-posts/profile-posts.component';

const routes: Routes = [{
  path: "",
  pathMatch: "full",
  redirectTo: "/home",
},
{
  path: "home",
  canActivate: [AuthenticatedGuard],
  component: HomeComponent
},
{
  path: "register",
  canActivate: [AuthenticatedGuard],
  component: RegisterComponent
},
{
  path: "login",
  canActivate: [AuthenticatedGuard],
  component: LoginComponent
},
{
  path: "logout",
  canActivate: [NotAuthenticatedGuard],
  component: LogoutComponent
},
{
  path: "profile",
  canActivate: [NotAuthenticatedGuard],
  component: ProfileComponent
},
{
  path: "posts",
  component: PostsComponent
},
{
  path: "post/create",
  canActivate: [NotAuthenticatedGuard],
  component: CreatePostComponent
},
{
  path: "post/edit/:postId",
  component: EditPostComponent,
},
{
  path: "post/delete/:postId",
  component: DeletePostComponent,
},
{
  path: "post/details/:postId",
  component: PostDetailsComponent,
},
{
  path: "comment/edit/:commentId",
  component: EditCommentComponent,
},
{
  path: "comment/delete/:commentId",
  component: DeleteCommentComponent,
},
{
  path: "profile/posts/:profileId",
  component: ProfilePostsComponent,
},
{
  path: "**",
  component: PageNotFoundComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
