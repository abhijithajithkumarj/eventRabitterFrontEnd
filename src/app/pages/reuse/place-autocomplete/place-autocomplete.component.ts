import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GoogleserviceService } from "../../../core/service/googleservice/googleservice.service";



export interface placeSearchResult{
     address:string;
     location?:google.maps.LatLng;
     name?: string
}

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent {
  

  
}
