import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './templates/header/header.component';
import { NavComponent } from './templates/nav/nav.component';
import { EditableTextComponent } from './functionals/editable-text/editable-text.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { TaskViewComponent } from './views/task-view/task-view.component';
import { CardViewComponent } from './views/card-view/card-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    EditableTextComponent,
    ProjectViewComponent,
    TaskViewComponent,
    CardViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
