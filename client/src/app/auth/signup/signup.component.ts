import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../core/user.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    countryCode: '',
    mobile: '',
  };
  error = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mobile: '',
  };
  countries = [{ name: 'India', code: '+91' }];
  processing = false;
  signedUp = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.countries = [];
    this.http.get('https://restcountries.eu/rest/v2/all?fields=name;callingCodes').subscribe(
      (countries: any) => {
        this.countries = countries.map(country => {
          return {
            name: country.name,
            code: country.callingCodes[0]
          };
        });
        this.user.countryCode = '+' + this.countries[0].code;
      }
    );
  }

  onCountryChange(country) {
    this.user.countryCode = '+' + this.countries.find(C => C.name === country).code;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.processing) { return; }
    this.processing = true;
    this.validateForm();
    if (this.noError()) {
      this.userService.signup(this.user)
        .then(() => this.signedUp = true)
        .catch(err => {
          this.processing = false;
          this.error.email = err.email || '';
          if (err.message) {
            this.toastService.error(err.message);
          }
        });
    } else {
      this.processing = false;
    }
  }

  validateForm() {
    this.validateName();
    this.validateEmail();
    this.validatePassword();
    this.validateMobile();
  }

  validateName() {
    if (!this.user.firstname) {
      this.error.firstname = 'Enter your firstname.';
    }
    if (!this.user.lastname) {
      this.error.lastname = 'Enter your lastname.';
    }
  }

  validateEmail() {
    const regex = new RegExp('^\\w+([\\.]\\w+)*@[a-zA-Z_]+\\.[a-zA-Z]{2,3}$');
    if (!this.user.email) {
      this.error.email = 'Enter your email.';
    } else if (regex.test(this.user.email) === false) {
      this.error.email = 'Invalid email.';
    }
  }

  validatePassword() {
    if (!this.user.password) {
      this.error.password = 'Enter a password.';
    } else if (this.user.password.length < 8) {
      this.error.password = 'Password should contain at least 8 characters.';
    }
  }

  validateMobile() {
    const regex = new RegExp('^[1-9]{1}[0-9]{9}$');
    if (!this.user.mobile) {
      this.error.mobile = 'Enter your mobile number.';
    } else if (regex.test(this.user.mobile) === false) {
      this.error.mobile = 'Invalid mobile number.';
    }
  }

  noError() {
    for (const i in this.error) {
      if (this.error[i]) { return false; }
    }
    return true;
  }

}
