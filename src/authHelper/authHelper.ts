import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { SvcConsts } from "../svcConsts/svcConsts";
// import { AuthService } from "../services/authenticate"
// import { ElecService } from "../services/electest";
// import { AdalService } from "../services/adalService";
import * as adal from "../adal/adal-request";

@Injectable()
export class AuthHelper {

    http: Http;
    // private authService: AuthService = new AuthService();
    // private elecService: ElecService = new ElecService();
    // private adalService: AdalService = new AdalService();

    public access_token: string = null;

    constructor(http: Http) {
        this.http = http;
    }

    public isUserAuthenticated(callback: Function) {
        adal.isAuthenticated(callback);
    }

    public getRequestPromise = (reqUrl: string): Promise<any> => {
        let p = new Promise<any>((resolve: Function, reject: Function) => {
            let tokenPromise = this.tokenPromise(SvcConsts.GRAPH_RESOURCE);

            tokenPromise.then((token: string) => {
                let headers = new Headers();
                headers.append("Authorization", "Bearer " + token);

                this.http.get(SvcConsts.GRAPH_RESOURCE + reqUrl, { headers: headers })
                    .map((res: any) => res.json())
                    .subscribe(
                    (res: any) => resolve(res),
                    (error: any) => reject(error));
            });
        });

        return p;
    };

    public getPhotoRequestPromise = (reqUrl: string): Promise<any> => {
        let p = new Promise<any>((resolve: Function, reject: Function) => {
            let tokenPromise = this.tokenPromise(SvcConsts.GRAPH_RESOURCE);
            tokenPromise.then((token: string) => {
                var request = new XMLHttpRequest;
                request.open("GET", SvcConsts.GRAPH_RESOURCE + reqUrl);
                request.setRequestHeader("Authorization", "Bearer " + token);
                request.responseType = "blob";
                request.onload = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                        };

                        reader.readAsDataURL(request.response);
                    } else {
                        reject("An error occurred calling the Microsoft Graph.");
                    }
                };

                request.send(null);
            });
        });

        return p;
    };

    public logIn() {       
        adal.login();
    }

    public logOut() {
        // this.authService.logOut();
    }

    private tokenPromise = (endpoint: string): Promise<string> => {
        let p = new Promise<string>((resolve: Function, reject: Function) => {
            var token = window.localStorage.getItem("access_token");
            if (token && token !== "undefined") {
                resolve(token);
            } else {
                this.getAccessToken();
                reject();
            }
        });

        return p;
    };

    private getAccessToken() {
        //redirect to get access_token
        window.location.href = "https://login.microsoftonline.com/" + SvcConsts.TENTANT_ID +
            "/oauth2/authorize?response_type=token&client_id=" + SvcConsts.CLIENT_ID +
            "&resource=" + SvcConsts.GRAPH_RESOURCE +
            "&redirect_uri=" + encodeURIComponent(SvcConsts.REDIRECT_URL) +
            "&prompt=none&state=SomeState&nonce=SomeNonce";
    }

    private parseQueryString(url: string) {
        let params = {}, queryString = url.substring(1),
            regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return params;
    }
}