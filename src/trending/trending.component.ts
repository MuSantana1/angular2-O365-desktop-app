import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { ToastComponent } from "../toast/toast.component";
import { USER_MESSAGES } from "../messages/messages"
import { OFFICE_URLS } from "../office/office-urls";

@Component({
    selector: "my-trending",
    templateUrl: "src/trending/view-trending.html",
})
export class TrendingComponent implements OnInit {
    private trends = [];

    constructor(private auth: AuthService, private toast: ToastComponent) {
    }

    ngOnInit(){
        this.toast.show(USER_MESSAGES.get_trending);
        this.getTrending();
    }

    private getTrending() {
        this.auth.getRequestPromise(OFFICE_URLS.me_trending_around_url)
            .then((data: any) => {
                if (data) {
                    this.trends = data.value;
                } else {
                    this.toast.show(USER_MESSAGES.fail_graph_api);
                }
            })
            .catch(() => {
                this.toast.show(USER_MESSAGES.fail_graph_api);
            });
    }
}