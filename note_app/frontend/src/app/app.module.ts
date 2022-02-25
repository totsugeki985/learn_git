import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.services';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoteComponent } from './note/note.component';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service'
import { SearchFormComponent } from './search-form/search-form.component';


const routes : Routes = 
[
  { path : "" , component: StartComponent},
  { path : "home" , component : NavbarComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NoteComponent,
    SliderComponent,
    NavbarComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot( routes ),
    HttpClientModule,
    NgbModule,
  ],
  providers: [UserService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
