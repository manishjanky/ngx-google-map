import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter
} from '@angular/core';
declare const google: any;
@Component({
  selector: 'ngx-google-map',
  templateUrl: './ngx-google-maps.component.html',
  styleUrls: ['./ngx-google-maps.component.scss']
})
export class NgxGoogleMapComponent implements OnInit {

  @Input() public mapType: string = 'ROADMAP';
  @Input() public multiplePlaces: boolean = false;
  @Output() public mapClick: EventEmitter<any> = new EventEmitter();
  @Output() public markerClick: EventEmitter<any> = new EventEmitter();
  @Output() public locationSelected: EventEmitter<any> = new EventEmitter();
  @ViewChild('map') private mapElement: ElementRef;
  @ViewChild('searchBox') private searchInput: ElementRef;
  @ViewChild('doneBtn') private doneButton: ElementRef;

  private mapOptions: any = {
    center: new google.maps.LatLng(51.5073391, -0.1284288),
    zoom: 16,
    mapTypeControl: true
  };
  private mapInstance: any;
  private mapSearchBox: any;
  private markers: any[] = [];
  private infoWindow: any = null;
  private selectedLocations: any[] = [];
  constructor() {
    console.log('Initializing Map');
  }
  public ngOnInit() {
    this.mapOptions.mapTypeId = google.maps.MapTypeId[this.mapType];
    this.mapOptions.mapTypeControlOptions = {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    };
    this.mapInstance = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.initMap();
  }

  private initMap() {
    this.addSearchBox();
    this.addDoneButton();
    this.initMapEvents();
  }

  private initMapEvents() {
    google.maps.event.addListener(this.mapInstance, 'click', (event: any) => {
      this.placeMarkerAndPanTo(event.latLng);
      this.mapClick.emit(event);
      console.log(event);
    });
  }
  private addDoneButton() {
    const controlUI: any = this.doneButton.nativeElement;
    controlUI.index = 1;
    controlUI.addEventListener('click', (event: any) => {
      this.locationSelected.emit({ event, locations: this.selectedLocations });
      console.log(this.selectedLocations);
    });
    this.mapInstance.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlUI);
  }

  private placeMarkerAndPanTo(latLang: any) {
    if (!this.multiplePlaces) {
      this.clearMarkers();
    }
    const marker = new google.maps.Marker({
      position: latLang,
      map: this.mapInstance,
      draggable: true
    });
    this.markers.push(marker);
    this.getMarketLocation(marker);
    this.addClickToMarker(marker);
    this.addDragToMarker(marker);
    this.mapInstance.panTo(latLang);
  }

  private addDragToMarker(marker: any) {
    google.maps.event.addListener(marker, 'dragend', (event: any) => {
      this.getMarketLocation(marker);
    });
  }

  private getMarketLocation(marker: any) {
    const currentLocation = marker.getPosition();
    const pos: any = {};
    // Add lat and lng values to a field that we can save.
    pos.latitude = currentLocation.lat(); // latitude
    pos.longitude = currentLocation.lng();
    if (this.multiplePlaces) {
      this.selectedLocations.push(pos);
      return;
    }
    this.selectedLocations[0] = pos;

  }
  private addClickToMarker(marker: any) {
    const geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(marker, 'click', (event: any) => {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
      this.infoWindow = new google.maps.InfoWindow();
      if (event) {
        this.getFromattedAddress(geocoder, event.latLng.toUrlValue(), this.infoWindow);
      }
      this.infoWindow.open(this.mapInstance, marker);
      this.markerClick.emit(event);
      console.log(event);
    });
  }

  private addSearchBox() {
    this.mapSearchBox = new google.maps.places.SearchBox(this.searchInput.nativeElement);
    this.mapInstance.controls[google.maps.ControlPosition.TOP_LEFT]
      .push(this.searchInput.nativeElement);
    this.addSearchEvent();
  }

  private getFromattedAddress(geocoder: any, latlang: any, infowindow: any) {
    const latlngStr = latlang.split(',');
    const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
    geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          infowindow.setContent(results[0].formatted_address);
        }
      }
    });
  }

  private addSearchEvent() {
    this.mapSearchBox.addListener('places_changed', () => {
      this.searchPlace();
    });
  }

  private clearMarkers() {
    this.markers.forEach((marker, index) => {
      marker.setMap(null);
      this.markers.splice(index, 1);
    });
  }
  private searchPlace() {
    const places = this.mapSearchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    this.clearMarkers();
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place: any) => {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      this.placeMarkerAndPanTo(place.geometry.location);
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.mapInstance.fitBounds(bounds);
  }
}
