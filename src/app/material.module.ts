import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule
  , MatPaginatorModule, MatProgressBarModule, MatCardModule, MatIconModule, MatGridListModule, MatSelectModule, MatOptionModule} 
  from '@angular/material';

import { MatChipsModule} 
  from '@angular/material/chips';
  
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule
    , MatProgressBarModule, MatCardModule, MatIconModule,FlexLayoutModule,MatGridListModule, MatSelectModule, MatOptionModule,MatChipsModule],
  exports: [MatButtonModule, MatTabsModule, MatToolbarModule, MatTableModule, MatDialogModule, MatPaginatorModule
    , MatProgressBarModule, MatCardModule, MatIconModule,FlexLayoutModule,MatGridListModule, MatSelectModule, MatOptionModule,MatChipsModule] ,
})
export class MaterialModule { }