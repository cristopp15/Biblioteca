import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ManageComponent } from './components/manage/manage.component';
import { AdminGuard } from 'src/app/services/admin.guard';
//import { ManageBooksComponent } from './components/manage-books/manage-books.component';
//import { ManageMagazinesComponent } from './components/manage-magazines/manage-magazines.component';
import { BooksComponent } from './components/books/books.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { UsersComponent } from './components/users/users.component'
import { InfoComponent } from './components/info/info.component';
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { MagazineEditComponent } from './components/magazine-edit/magazine-edit.component';
import { AddMagazineComponent } from './components/add-magazine/add-magazine.component';
import { MagazineDetailComponent } from './components/magazine-detail/magazine-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent}, //path: '' esto quiere decir que va a ser lo primero que se muestre 1 solo uso
  {path: 'home', component: HomeComponent},
  {path: 'books', component: BooksComponent}, // path: 'nombre_de_la_URL esto hace referncia a lo que irá                                              //despues del / (slash) 
  {path: 'magazines', component: MagazinesComponent},
  {path: 'register', canActivate: [AdminGuard], component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  //{path: 'manageMagazines',canActivate:[AdminGuard], component: ManageMagazinesComponent},
  //{path: 'manageBooks',canActivate: [AdminGuard], component: ManageBooksComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'book/edit/:id', component: BookEditComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'magazine/edit/:id', component: MagazineEditComponent},
  {path: 'magazine/:id', component: MagazineDetailComponent},
  {path: 'createBook', component: AddBookComponent},
  {path: 'createMagazine', component: AddMagazineComponent},
  {path: 'info', component: InfoComponent},
  {path: '**', component: NotfoundComponent} //path: '**' quiere decir que será la página por defecto cuando no 
                                         // encuentre un recurso 1 solo
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
