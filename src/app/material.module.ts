import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule
  , MatPaginatorModule, MatProgressBarModule, MatCardModule, MatIconModule, MatGridListModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule
    , MatProgressBarModule, MatCardModule, MatIconModule,FlexLayoutModule,MatGridListModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule
    , MatProgressBarModule, MatCardModule, MatIconModule,FlexLayoutModule,MatGridListModule] ,
})
export class MaterialModule { }