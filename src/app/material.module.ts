import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule],
})
export class MaterialModule { }