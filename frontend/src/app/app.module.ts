import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { RegisterComponent } from './components/register/register.component';

import { RestService } from './services/rest/rest.service';
import { LoginComponent } from './components/login/login.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ManageComponent } from './components/manage/manage.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchBPipe} from './pipes/searchB.pipe';
//import { ManageBooksComponent } from './components/manage-books/manage-books.component';
//import { ManageMagazinesComponent } from './components/manage-magazines/manage-magazines.component';
import { BooksComponent } from './components/books/books.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { UsersComponent } from './components/users/users.component';
import { InfoComponent } from './components/info/info.component';
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RestBookService } from './services/restBook/rest-book.service';
import { RestMagazineService } from './services/restMagazine/rest-magazine.service';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { MagazineDetailComponent } from './components/magazine-detail/magazine-detail.component';
import { MagazineEditComponent } from './components/magazine-edit/magazine-edit.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddMagazineComponent } from './components/add-magazine/add-magazine.component';
import { SearchMPipe } from './pipes/search-m.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotfoundComponent,
    ProductsComponent,
    CategoryComponent,
    RegisterComponent,
    LoginComponent,
    UserSettingsComponent,
    ManageComponent,
    SearchPipe,
    SearchBPipe,
    //ManageBooksComponent,
    //ManageMagazinesComponent,
    BooksComponent,
    MagazinesComponent,
    UsersComponent,
    InfoComponent,
    UserDetailComponent,
    UserEditComponent,
    BookEditComponent,
    BookDetailComponent,
    MagazineDetailComponent,
    MagazineEditComponent,
    AddBookComponent,
    AddMagazineComponent,
    SearchMPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RestService,
    RestBookService,
    RestMagazineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 


