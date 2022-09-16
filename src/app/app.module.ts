import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [ // Declarations array define which of our components belong to this module
                  // Declarations array is for declaring components directives and pipes that belong to this module
    AppComponent,
    WelcomeComponent
  ], 
  imports: [ // Define the external modules that we want to have available to all of the components that belong to this Angular module 
            // Imports array is for pulling in external modules
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'} // The ** means it is a wildcard path. In case the requested URL doesnt match any prior paths defined in the config
    ]),
    ProductModule
  ], 

  bootstrap: [ AppComponent ]  // Defines the startup component of the application 
})
export class AppModule { }
