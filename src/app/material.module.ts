import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatProgressBarModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatProgressBarModule],
})
export class MaterialModule { }