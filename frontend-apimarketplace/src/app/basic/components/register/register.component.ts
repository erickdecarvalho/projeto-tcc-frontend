import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

    ngOnInit() {
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
      })
    }

    submitForm() {
      this.authService.registerConsumer(this.validateForm.value).subscribe(res => {
        this.router.navigateByUrl("/login")
      })
    }

    registerProvider(){
      this.router.navigateByUrl('/register-provider');
    }
}
