import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule],
})
export class MaterialModule { }