import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule],
})
export class MaterialModule { }