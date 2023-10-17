import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs/operators"
import { SingleResponse } from "./model/responses.model"
import { User } from "./model/user.model"
import { Observable } from "rxjs"
import { LoginResponse } from "./model/login-response.model"


@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) { }

    public login(credentials: any) : Observable<SingleResponse<LoginResponse>> {
        return this.http.post<SingleResponse<LoginResponse>>("https://localhost:44386/api/auth/login", 
            JSON.stringify(credentials), {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                })
            }
        ).pipe(
            map((response: SingleResponse<LoginResponse>) => {
                if (!response.isSuccess) {
                    throw new Error(response.message);
                }
                return response ;
            })
        )
    }

    public logout() {
        localStorage.removeItem("token")
    }

}