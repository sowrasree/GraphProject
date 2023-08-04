import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'line-graph', component:LineChartComponent},
  {path:'bar-graph', component:BarGraphComponent},
  {path:'home', component:LandingPageComponent},
  {path:'login', component:AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
