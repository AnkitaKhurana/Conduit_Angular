import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }

  responseError: string;
  returnUrl: string;
  form: FormGroup;
  constructor(private route: ActivatedRoute,private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  
  login(): void {
    this.userService.login(this.form.value).subscribe(user => {
      this.router.navigateByUrl(this.returnUrl);
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
      password: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
