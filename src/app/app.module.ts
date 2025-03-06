import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { CartEffects } from './state/cart.effects';
import {cartReducer} from './state/cart.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    CoreModule, 
    SharedModule,
    NgxSpinnerModule.forRoot({ type: 'three-bounce' }),
    StoreModule.forRoot({cart: cartReducer}),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync(),
    CookieService,
    provideHttpClient(),

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}