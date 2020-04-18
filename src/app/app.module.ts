import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ShapeService} from './Services/shape.service';
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
