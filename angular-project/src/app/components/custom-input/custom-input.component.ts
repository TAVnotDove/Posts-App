import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  ngOnInit(): void {
    this.inputType = this.type;
  }

  showPassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  @Input() fc: FormControl = new FormControl();
  @Input() id: string = '';
  @Input() type: string = 'text';
  inputType: string = 'text';
}
