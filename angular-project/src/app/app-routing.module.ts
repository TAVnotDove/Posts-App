import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [{
  path: "",
  pathMatch: "full",
  redirectTo: "/home",
},
{
  path: "home",
  component: HomeComponent
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "login",
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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
