import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Adicionando validação de email
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.get('email')!.value, this.validateForm.get('password')!.value)
        .subscribe(res => {
          console.log(res);
          if (UserStorageService.isConsumerLoggedIn()) {
            this.router.navigateByUrl("consumidor/home");
          }  else if (UserStorageService.isProviderLoggedIn()) {
              this.router.navigateByUrl('provider/my-apis');
          }
        }, error => {
          alert("Dados incorretos!");
        });
    }
  }
}
