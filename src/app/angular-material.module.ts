import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  } from "@angular/material";
import { NgModule } from "@angular/core";

  @NgModule({
    //   imports:[
    //     MatInputModule,
    //     MatCardModule,
    //     MatButtonModule,
    //     MatToolbarModule,
    //     MatExpansionModule,
    //     MatDialogModule,
    //     MatPaginatorModule,
    //     MatProgressSpinnerModule
    //   ],
      exports:[
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MatPaginatorModule,
        MatProgressSpinnerModule

      ]

  })
export class AngularMaterialModule{}