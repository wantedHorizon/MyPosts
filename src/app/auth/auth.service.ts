import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListner= new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router){}
    createUser( email: string, password: string){
        const authData: AuthData = { email: email, password:password};
        this.http.post("http://localhost:3000/api/user/signup", authData)
        .subscribe(response => {
                console.log(response);
        });

    }

    getAuthStatusListner(){
        return this.authStatusListner.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    login(email: string, password: string){
        const authData: AuthData = { email: email, password:password};
        this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
        .subscribe( response => {
            const token= response.token;
            this.token = token;
            //user is authenticated we inform all
            if(token){
               
                this.isAuthenticated = true;
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.authStatusListner.next(true);
                const now =new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
               this. saveAuthData(token, expirationDate);
                this.router.navigate(['/']);
            }
        
        });
        
    }

    private setAuthTimer( duration: number){
        console.log("Setting timer: "+duration);
        this.tokenTimer= setTimeout( () => { this.logout()}, duration*1000);
        
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListner.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);

    }

    getToken(){
        return this.token;
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());

    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');

    }

    
    autoAuthUser(){
        const authInfomation = this.getAuthData();
        if(!authInfomation){
            return;
        }
            const now = new Date();
            const expiresIn = authInfomation.expirationDate.getTime() - now.getTime();
            if(expiresIn > 0){
               this.token= authInfomation.token;
               this.isAuthenticated= true;
               this.setAuthTimer(expiresIn/1000);
               this.authStatusListner.next(true);
            }
        
        
    }
    private getAuthData(){
        const token= localStorage.getItem("token");
        const expirationDate= localStorage.getItem("expiration");
        if(!token || !expirationDate){
            return;
        }
        return {token: token, expirationDate: new Date(expirationDate)};

    }

}