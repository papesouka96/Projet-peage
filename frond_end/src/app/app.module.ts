import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { AccueilDashboardComponent } from './accueil-dashboard/accueil-dashboard.component';
import { SidebarComponent } from './users/sidebar/sidebar.component';
import { TableHistoriqueComponent } from './table-historique/table-historique.component';
import { ModifComponent } from './modif/modif.component';
import { GestionArrosageComponent } from './gestion-arrosage/gestion-arrosage.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { JwtInterceptorService } from './helpers/interceptor.service';
import { ProfilComponent } from './profil/profil.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { AjoutAgentComponent } from './ajout-agent/ajout-agent.component';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { AjoutAbonneComponent } from './ajout-abonne/ajout-abonne.component';
// import { AgmCoreModule } from '@agm/core';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {
    transports: ["websocket"]
} };


 

@NgModule({

    declarations: [
        AppComponent,
        LoginComponent,
        AccueilDashboardComponent,
        SidebarComponent,
        TableHistoriqueComponent,
        ModifComponent,
        GestionArrosageComponent,
        LocalisationComponent,
        ProfilComponent,
        TransactionComponent,
        ListeAgentComponent,
        AbonnementComponent,
        AjoutAgentComponent,
        AjoutAbonneComponent
        
    ],
    bootstrap: [AppComponent],
    imports: [
        [NgbModule],
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,  
        NgxPaginationModule,
        CommonModule,
        Ng2SearchPipeModule,
        NgStyle,
        NgClass,

        SocketIoModule.forRoot(config),

        // AgmCoreModule.forRoot({
        //     apiKey:'AIzaSyCxAv0CVKvj0d_QKjprqmok50C5syVoNxg'
        // })


    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
           },
      ],
})
export class AppModule {}
