import React from 'react'
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {
    Marker,
} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marginBottom: 1,
            initialRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            }
        }
    }

    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.
        //if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    var lat = parseFloat(position.coords.latitude)
                    var long = parseFloat(position.coords.longitude)
  
                    var initialRegion = {
                      latitude: lat,
                      longitude: long,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }
  
                    this.setState({initialRegion: initialRegion})
                    this.mapView.animateToRegion(initialRegion,2000)
                    
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        //}
      }
    
      renderScreen = () => {
          return (
            <View style={styles.container}>
              <MapView style={{flex: 1}}
                    initialRegion={this.state.initialRegion}
                    followUserLocation={true}
                    ref={mapView => (this.mapView = mapView)}
                    >
                    <Marker
                        coordinate={
                            {
                                latitude: this.state.initialRegion.latitude, 
                                longitude: this.state.initialRegion.longitude
                            }
                        }
                        title={'title'}
                        description={'description'}
                    />
              </MapView>
            </View>
          );
      }
      
      render() {
        return (
          this.renderScreen()
        );
      }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"
    }
});