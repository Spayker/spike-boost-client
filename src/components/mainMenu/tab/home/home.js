import React from 'react'
import {View, Dimensions, TouchableOpacity, Alert, Text, PermissionsAndroid, AsyncStorage} from 'react-native'
// import globals from '../../../common/globals'
import MapView, { Marker } from "react-native-maps"
import Geolocation from 'react-native-geolocation-service'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import * as Progress from 'react-native-progress'
import styles from "./styles"

const {width, height} = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

/**
 * Component below displays map component and few more small components that are related to training activity current user can have.
 * Loads by default when an user has passed SignIn/SignUp procedure.
 */
export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            time: {
                'h': '00',
                'm': '00',
                's': '00'
            }, 
            seconds: 0,
            speed: '0 km/h',
            distance: '0 km',
            callories: '0',
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

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours < 10 ? '0' + hours : hours,
          "m": minutes < 10 ? '0' + minutes : minutes,
          "s": seconds < 10 ? '0' + seconds : seconds
        };
        return obj;
    }
    
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    
    startTimer() {
        if (this.timer >= 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.timer);
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        })
    }

    /**
     * Sets map ready state to true since map has been already loaded and displayed
     * Returns: nothing
     */
    onMapLayout = () => { this.setState({ isMapReady: true }) }

    /**
     * Sets media started state to true once an user has pressed appropriate media button on screen
     * Returns: nothing
     */
    startMedia = () => {  this.setState({isMediaStarted: true}) }

    /**
     * Sets media started state to false once an user has pressed appropriate media button on screen
     * Returns: nothing
     */
    stopMedia = () => { this.setState({isMediaStarted: false}) }

    /**
     * Sets training started and sub menu popup states to true, since an user has begun training already.
     * Returns: nothing
     */
    startTraining = () => {  
        this.setState({isTrainingStarted: true})
        this.setState({isPopup: true})
        this.startTimer()
    }

    /**
     * Sets training started and sub menu popup states to false, since an user has stopped training already.
     * Returns: nothing
     */
    stopTraining = () => { 
        this.setState({isTrainingStarted: false}) 
        //this.setState({isPopup: false}) 
        this.stopTimer()
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
                                                <Icon name={'running'} size={24} style={styles.secondaryFunctionButtonIcon} /> 
                                            </TouchableOpacity>
                                        )
                                    }

                                    <View style={ styles.popupContainer }>
                                        <View style={ styles.innnerPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>Time</Text>
                                            <Text style={styles.popupContainerItemData}>
                                                
                                                {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
                                                
                                            </Text>
                                        </View>

                                        <View style={ styles.innnerPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>Speed</Text>
                                            <Text style={styles.popupContainerItemData} >
                                                {
                                                    this.state.speed
                                                }
                                            </Text>
                                        </View>

                                        <View style={ styles.innnerPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>Distance</Text>
                                            <Text style={styles.popupContainerItemData} >
                                                {
                                                    this.state.distance
                                                }
                                            </Text>
                                        </View>

                                        <View style={ styles.innnerPopupContainer }>
                                            <Text style={styles.popupContainerItemHeader}>Callories</Text>
                                            <Text style={styles.popupContainerItemData} >
                                                {
                                                    this.state.callories
                                                }
                                            </Text>
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