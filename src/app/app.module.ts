import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AlertModule} from "ngx-bootstrap/alert";
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { PostPageComponent } from './component/post-page/post-page.component';
import {AdminModule} from "./admin/admin.module";
import { PostComponent } from './component/post/post.component';
import {QuillModule} from "ngx-quill";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthService} from "./admin/auth.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const INTERSEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    QuillModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERSEPTOR, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
