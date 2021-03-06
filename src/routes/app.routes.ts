import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { FilesComponent } from "../files/files.component";
import { ContactsComponent } from "../contacts/contacts.component";
import { GroupsComponent } from "../groups/groups.component";
import { MailsComponent } from "../mails/mails.component";
import { NotesComponent } from "../notes/notes.component";
import { TasksComponent } from "../tasks/tasks.component";
import { TrendingComponent } from "../trending/trending.component";
import { UsersComponent } from "../users/users.component";
import { AuthGuardService } from "../auth/auth-guard.service";

const appRoutes: Routes = [
    { component: LoginComponent, path: "login" },
    { canActivate: [AuthGuardService], component: HomeComponent, path: "" },
    { canActivate: [AuthGuardService], component: HomeComponent, path: "home" },
    { canActivate: [AuthGuardService], component: FilesComponent, path: "files" },
    { canActivate: [AuthGuardService], component: GroupsComponent, path: "groups" },
    { canActivate: [AuthGuardService], component: ContactsComponent, path: "contacts" },
    { canActivate: [AuthGuardService], component: MailsComponent, path: "mails" },
    { canActivate: [AuthGuardService], component: NotesComponent, path: "notes" },
    { canActivate: [AuthGuardService], component: TasksComponent, path: "tasks" },
    { canActivate: [AuthGuardService], component: TrendingComponent, path: "trending" },
    { canActivate: [AuthGuardService], component: UsersComponent, path: "users" },
    { component: LoginComponent, path: "**"},
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);
