# ngx-google-map

[![GitHub license](https://img.shields.io/github/license/manishjanky/ngx-google-map.svg)](https://github.com/me-and/mdf/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/ngx-google-map.svg)]()
[![Build Status](https://travis-ci.org/manishjanky/ngx-google-map.svg?branch=master)](https://travis-ci.org/manishjanky/ngx-google-map)
[![npm](https://img.shields.io/npm/dt/ngx-google-map.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/manishjanky/ngx-google-map.svg)]()
[![GitHub closed issues](https://img.shields.io/github/issues-closed/manishjanky/ngx-google-map.svg)]()
[![GitHub contributors](https://img.shields.io/github/contributors/manishjanky/ngx-google-map.svg)]()

`ngx-google-map` an Angular 4 based component for using google maps in your angular app.

## Examples

* [demo-page](https://manishjanky.github.io/ngx-google-map-demo/)

## Features

* Click to add marker
* Drag marker to select a location
* Satellite/Map view
* Zoom in / Zoom out
* Search a location
* Toogle fullscreen mode on/off
* Responsive

## Installation

* `npm install ngx-google-map`
* include google maps scripts in your index.html 

`````
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry,places"></script>
`````

### For webpack and tsc builds/ angular-cli builds

* import `NgxGoogleMapModule` from `ngx-google-map`:

```
import { NgxGoogleMapModule } from 'ngx-google-map'
```

* add `NgxGoogleMapModule` to the imports of your NgModule:

```
@NgModule({
  imports: [
    ...,

    NgxGoogleMapModule
  ],
  ...
})
class YourModule { ... }
```

* use `<ngx-google-map></ngx-google-map>` in your templates to add google maps in your view like below

```
<ngx-google-map [mapType]="'ROADMAP'" [multiplePlaces]="false"></ngx-google-map>
```

* do not forget to include google maps api in your build process, module or index.html!

## Config

### Input

* `mapType: string` - type of map that you want to be created defaults to `ROADMAP`.
* `multiplePlaces: boolean` - property whether user can select multiple places on the map defaults to `false`.

### Output

* `mapClick: EventEmitter` - click event whenever a user clicks on the map anywhere,
* `markerClick: EventEmitter` - click event when a user clicks on a marker on the map,
* `locationSelected: EventEmitter` - event whena user selects a location on the map

```
{
    locations: []: selectedLocations,
}
```

## Changelog
* v1.0.0
````
Intial release
````

## Help Improve

Found a bug or an issue with this? [Open a new issue](https://github.com/manishjanky/ngx-google-map/issues) here on GitHub.

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
