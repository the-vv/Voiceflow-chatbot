import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFacilityComponent } from './create-facility/create-facility.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: "create-facility",
    component: CreateFacilityComponent
  }, {
    path: "chat",
    component: ChatComponent
  }, {
    path: "",
    redirectTo: "chat",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
