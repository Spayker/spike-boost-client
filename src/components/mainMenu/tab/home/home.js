import React from 'react'
import {View, Dimensions, TouchableOpacity, Alert, Text, PermissionsAndroid, AsyncStorage} from 'react-native'
import globals from '../../../common/globals'
import MapView, { Marker } from "react-native-maps"
import Geolocation from 'react-native-geolocation-service'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as Progress from 'react-native-progress'
import styles from "./styles"

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            marginBottom: 1,
            isMapReady: false,
            isPopup: false,
            isMediaStarted: false,
            isTrainingStarted: false,
            shallShowDeviceMarker: 'true',
            initialRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            }
        }
    }

    onMapLayout = () => { this.setState({ isMapReady: true }) }

    startMedia = () => {  this.setState({isMediaStarted: true}) }

    stopMedia = () => { this.setState({isMediaStarted: false}) }

    startTraining = () => {  
        this.setState({isTrainingStarted: true})
        this.setState({isPopup: true})
         
    }

    stopTraining = () => { 
        this.setState({isTrainingStarted: false}) 
        this.setState({isPopup: false}) 
    }

    componentDidMount = async () => {
        try {
            //this.setState({ shallShowDeviceMarker: await AsyncStorage.getItem(globals.SHALL_SHOW_DEVICE_MARKER_KEY) })
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => { 
                console.debug('home.js [componentDidMount]: location permission granted: ' + granted)
            });
            await Geolocation.getCurrentPosition(
                (position) => {
                    console.debug(position);
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
                },
                (error) => { console.debug('home.js [componentDidMount]:' + error.message) },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 3600000 }
            );
        } catch (error) { console.error("home.js [componentDidMount]: error has occured. " + error) }
    }
    
    renderScreen = () => {
            return (
                    <View style={styles.container}>    
                        
                        <MapView style={{flex: 1}}
                            initialRegion={this.state.initialRegion}
                            followUserLocation={true}
                            showsMyLocationButton={false}
                            showsCompass={false}
                            moveOnMarkerPress={false}
                            zoomEnabled={true}
                            minZoomLevel={18}
                            onLayout={this.onMapLayout}
                            onPress={() => {if(this.state.isPopup) this.setState({ isPopup: !this.state.isPopup }) }  }
                            ref={mapView => (this.mapView = mapView)}>

                            { 
                                this.state.isMapReady && (this.state.shallShowDeviceMarker == 'true') &&
                                    <Marker coordinate={
                                            {
                                                latitude: this.state.initialRegion.latitude, 
                                                longitude: this.state.initialRegion.longitude
                                            }
                                        }
                                        onPress = { () => this.setState({ isPopup: !this.state.isPopup }) }>
                                        <Icon name={'circle'} size={24} style={styles.navigationCurrentIcon}/>
                                    </Marker>
                            }

                        </MapView>

                        {
                            this.state.isMediaStarted ? (
                                <TouchableOpacity style={ styles.mediaButton } onPress={ () => this.stopMedia() }> 
                                    <Icon name={'stop'} size={24} style={styles.mediaButtonIcon} /> 
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={ styles.mediaButton } onPress={ () => this.startMedia() }> 
                                    <Icon name={'play'} size={24} style={styles.mediaButtonIcon} /> 
                                </TouchableOpacity>
                            )
                        }

                        {
                            this.state.isPopup ? (
                                <View>
                                    

                                    {
                                        this.state.isTrainingStarted ? (
                                            <TouchableOpacity style={ styles.secondaryFunctionPopupButton } onPress={ () => this.stopTraining() }> 
                                                <Icon name={'stop'} size={24} style={styles.secondaryFunctionButtonIcon} /> 
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={ styles.secondaryFunctionPopupButton } onPress={ () => this.startTraining() }> 
                                                <Icon name={'play'} size={24} style={styles.secondaryFunctionButtonIcon} /> 
                                            </TouchableOpacity>
                                        )
                                    }

                                    <View style={ styles.popupContainer }>
                                        <View style={ styles.leftPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>My device</Text>
                                            <Text style={styles.popupContainerItemCoordinates}>{
                                                this.state.initialRegion.latitude 
                                                + ', ' 
                                                + this.state.initialRegion.longitude}
                                            </Text>
                                        </View>

                                        <View style={ styles.rightPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>Device battery life</Text>
                                            <View style={ styles.popupPowerLevelRow }>
                                                <Text style={styles.popupContainerItemBatteryGreenLevel}>100%</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (

                                    
                                
                                this.state.isTrainingStarted ? (
                                    <TouchableOpacity style={ styles.secondaryFunctionButton } onPress={ () => this.stopTraining() }> 
                                        <Icon name={'flag-checkered'} size={24} style={styles.secondaryFunctionButtonIcon} /> 
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={ styles.secondaryFunctionButton } onPress={ () => this.startTraining() }> 
                                        <Icon name={'running'} size={24} style={styles.secondaryFunctionButtonIcon} /> 
                                    </TouchableOpacity>
                                )
                                
                                    
                                    

                                

                                
                            )
                        }
                    </View>
            );
    }
      
    render() {
        //const showDeviceMarker = this.props.navigation.getParam('shallShowDeviceMarker', 'false')
        //if(showDeviceMarker == 'true' && this.state.shallShowDeviceMarker == 'false'){
        //    this.setState({ shallShowDeviceMarker: showDeviceMarker})
        //}

        // console.debug('home.js [render]: rendering location screen. current latitude - ' + this.state.initialRegion.latitude)
        // if(this.state.initialRegion.latitude !== 0) {
            return ( this.renderScreen() );
        // } else {
        //     return ( 
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //             <Progress.CircleSnail size={40} indeterminate={true} />
        //         </View>
        //     );
        // }
    }
}