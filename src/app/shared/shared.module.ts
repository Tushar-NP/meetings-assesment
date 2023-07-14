import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [HeaderComponent, NotificationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
