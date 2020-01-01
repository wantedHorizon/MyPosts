import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListner= new Subject<boolean>();
    constructor(private http: HttpClient){}
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
        this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
        .subscribe( response => {
            const token= response.token;
            this.token = token;
            //user is authenticated we inform all
            if(token){
                this.isAuthenticated = true;
                this.authStatusListner.next(true);
            }
        
        });
        
    }

    getToken(){
        return this.token;
    }

}