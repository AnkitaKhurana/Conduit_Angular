import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private userService : UserService,private formBuilder: FormBuilder) { }
  login(): void {
    this.userService.login(this.form.value).subscribe(user =>
      {         
      },     
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      password: [null, Validators.required]
    });
  }

}
