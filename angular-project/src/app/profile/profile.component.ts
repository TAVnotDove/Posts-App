import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemesService } from '../services/themes.service';
import { dateConverter } from '../utils/date-converter.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null

  form: any = this.fb.group({
    username: [""],
    email: [""],
    created: [""],
    theme: ["lightTheme"]
  })

  constructor(private fb: FormBuilder, private themesService: ThemesService){}
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);

    this.themesService.getThemes().subscribe({
      next: (v: any) => {
            console.log(v)
            const theme = v.filter((x: any) => x._ownerId === this.user._id)
        console.log(theme)
                this.form = this.fb.group({
                  username: [{
                    value: this.user.username,
                    disabled: true,
                  }],
                  email: [{
                    value: this.user.email,
                    disabled: true,
                  }],
                  created: [{
                    value: dateConverter(this.user._createdOn),
                    disabled: true,
                  }],
                  theme: [{
                    value: theme
                  }],
                })
          },
          error: (e) => {
            console.error(e)
          }
    })
  }

  changeTheme(): void {
    const profileData = this.form.value

    this.themesService.changeTheme({theme: profileData.theme}, this.user.accessToken, this.user._id)
    console.log(profileData)
    document.body.classList.toggle("dark-theme");
  }
}
