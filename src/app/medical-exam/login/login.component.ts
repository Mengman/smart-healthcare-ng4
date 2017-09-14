import "style-loader!./login.scss";
import {LoginService} from "./login.service";
import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import 'style-loader!./login.scss';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalState} from "../../global.state";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  providers: [LoginService],
  styleUrls:['./login.css']
})
export class Login {

  public form: FormGroup;
  public name: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(private _service: LoginService, private fb: FormBuilder, private elementRef: ElementRef,
              private route: ActivatedRoute, private router: Router, private Renderer: Renderer2, private GlobalState:GlobalState) {

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.form.controls['name'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(event: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this._service.login(this.name.value, this.password.value).then(
        res => {
          if (res.aboolean === true) {
            this.router.navigate(['/medical-exam/pages']);
            sessionStorage.setItem("user_type", res.data);
          } else {
          }
        }).catch(error => console.log(error))
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){

    let header : HTMLElement = this.elementRef.nativeElement.querySelector('#header');
    let content : HTMLElement = this.elementRef.nativeElement.querySelector('#content');
    let login : HTMLElement = this.elementRef.nativeElement.querySelector('#LoginPart');

    if( header.scrollHeight > content.scrollHeight) {
      // content.style.marginTop = (header.scrollHeight - content.scrollHeight) / 2 + 20 + 'px';
      this.Renderer.setStyle(content,'marginTop', "(header.scrollHeight - content.scrollHeight)/2 + 20 + 'px'");
    }

    if( screen.width < 1920 && screen.height < 1080) {
      // content.style.width = 980 + 'px' ;
      // content.style.height = 560 + 'px';
      // content.style.minWidth = 980 + 'px';
      // login.style.top = 120 + 'px';
      this.Renderer.setStyle(content,'width','980px');
      this.Renderer.setStyle(content,'height','560px');
      this.Renderer.setStyle(content,'minWidth','980px');
      this.Renderer.setStyle(login,'top','120px')
    }
  }

  ngOnInit(){
    this.onResize(event);
  }

}
