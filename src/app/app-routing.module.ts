import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./component/main-layout/main-layout.component";
import {HomePageComponent} from "./component/home-page/home-page.component";
import {PostPageComponent} from "./component/post-page/post-page.component";

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
