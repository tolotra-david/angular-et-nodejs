import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatFormFieldAppearance} from "@angular/material/form-field/form-field"
import {User} from "../User.interface"

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  isUserNotFound: boolean = false
  isValidUser: boolean = false
  isEdit: boolean = false
  isLogin: boolean = true
  isExistingUser: boolean = false
  usernameExit: string = ''
  inputType: string = 'password'
  isAdd: boolean = false
  inputAppearance: MatFormFieldAppearance = 'legacy'
  inputInitialValue: User = { username: '', password: ''}

   form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  @Input('isEditComponent') isEditComponent: boolean = false
  @Input('isAddComponent') isAddComponent: boolean = false


  constructor( private service: UserService,
               private router: Router,
               private activateRoute: ActivatedRoute) {
  }

  ngOnInit(){

    if(this.isEditComponent){
      this.isLogin = !this.isLogin

      this.isEdit = !this.isEdit
      this.inputType = 'text'
      this.inputAppearance = 'outline'
      this.activateRoute.queryParamMap
        .subscribe(param => {
          this.service.getUserById(param.get('id'))
            .subscribe(res => {
              this.inputInitialValue = {username: res.username, password: res.password}
              this.form.setValue(this.inputInitialValue)
            })
        });
      this.isExistingUser = false
    }

    if (this.isAddComponent){
      this.isLogin = !this.isLogin

      this.isAdd = !this.isAdd
      this.inputAppearance = 'outline'
      this.inputType = 'text'
    }
  }

  get username(): any {
    return this.form.get('username')
  }

  get password(): any{
    return this.form.get('password')
  }

  create() {
    let username = this.username.value.toLowerCase()
    this.service.add({username, password: this.password.value})
      .subscribe(user => {
        if(user.exist){
          this.isValidUser = true
        }else{
          localStorage.setItem("userId", user.id)
          this.router.navigate(['/home'])
        }
      })
  }

  onSignIn() {
    let username = this.username.value.toLowerCase()
    this.service.sign({username, password: this.password.value})
      .subscribe(res => {
        if(res.isNotFound){
          this.isUserNotFound = true
        }else{
          localStorage.setItem("userId", res.id)
          this.router.navigate(['/home'])
        }
      })
  }

  save() {
    if( this.username.value  === this.inputInitialValue.username &&
        this.password.value === this.inputInitialValue.password){
        this.cancel()
    }

    this.activateRoute.queryParamMap
      .subscribe(param => {
        this.service.update(param.get('id'),
          {
            username: this.username.value.toLowerCase(),
            password: this.password.value
          })
          .subscribe(res => {
            if(res.exist){
              this.isExistingUser = true
              this.usernameExit = this.username.value
            }
            if(res.isUpdated || !res.isChange){
              this.router.navigate(['/home'])
            }

          })
      })
  }

  addUser() {
    let username = this.username.value.toLowerCase()
    this.service.add({username, password: this.password.value})
      .subscribe(user => {
        if(user.exist){
          this.isValidUser = true
        }else{
          this.router.navigate(['/home'])
        }
      })
  }

  cancel() {
    this.router.navigate(['/home'])
  }
}

