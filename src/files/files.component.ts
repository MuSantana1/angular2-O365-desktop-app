import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { ToastComponent } from "../toast/toast.component";
import { USER_MESSAGES } from "../messages/messages"
import { OFFICE_URLS } from "../office/office-urls";

@Component({
    selector: "my-files",
    templateUrl: "src/files/view-files.html"
})

export class FilesComponent implements OnInit {
    private files = [];

    constructor(private auth: AuthService,
        private toast: ToastComponent) {
    }

    ngOnInit() {
        this.toast.show(USER_MESSAGES.get_files);
        this.getFiles();
    }

    public getFiles() {
        // perform REST call into Microsoft Graph for files on OneDrive for Business
        this.auth.getRequestPromise(OFFICE_URLS.me_drive_url)
            .then((data: any) => {
                if (data) {
                    this.files = data.value;
                } else {
                    this.toast.show(USER_MESSAGES.fail_graph_api);
                }
            }).catch(() => {
                this.toast.show(USER_MESSAGES.fail_graph_api);
            });
    }
}