import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MultiComponent } from './multi/multi.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    MultiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    AuthModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'activate/:userId', component: MultiComponent, data: {type: 'activate'} },
      { path: 'reset/:token', component: MultiComponent, data: {type: 'reset'} },
      { path: '**', component: MultiComponent, data: { type: 'not-found' } }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
