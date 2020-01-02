import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
    constructor(private authService: AuthService){}
    
    onSignup(form: NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading= true;
        this.authService.createUser(form.value.email, form.value.password);
        
       // console.log(form.value);

    }

    ngOnInit(){
        this.authStatusSub = this.authService.getAuthStatusListner().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    ngOnDestroy(){
        this.authStatusSub.unsubscribe();
    }
}