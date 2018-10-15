import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }
  form: FormGroup;
  responseError: string;
  register(): void {
    this.userService.register(this.form.value).subscribe(user => {
      console.log(user)
    },
      error => {
        Object.keys(JSON.parse(error._body).errors).forEach((k) => this.responseError = k + ' ' + JSON.parse(error._body).errors[k])
      }
    )
  }
  ngOnInit() {
    this.responseError = '';
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      username: [null, Validators.required,]
    });
  }
}
