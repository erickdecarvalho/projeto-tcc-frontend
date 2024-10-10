import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-provider',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-provider.component.html',
  styleUrls: ['./register-provider.component.css'],
})
export class RegisterProviderComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      organizationName: [null, [Validators.required]]
    });
  }

  submitForm() {
    this.authService
      .registerProvider(this.validateForm.value)
      .subscribe((res) => {
        this.router.navigateByUrl('/login');
      });
  }
}
