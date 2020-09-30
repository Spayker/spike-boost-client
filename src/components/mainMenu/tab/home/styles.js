import { StyleSheet } from 'react-native';

/**
 * Home tab component styles component
 */
export default styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"
    },

    mediaButton: {
        position: 'absolute',                                          
        top: 25,                                                    
        right: 10,
        width: 64,
        height: 64,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'baseline'
    },

    mediaButtonIcon: {
        alignSelf: 'center',
        color: '#EC5805',
    },

    secondaryFunctionButton: {
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 10,
        width: 64,
        height: 64,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    
    secondaryFunctionPopupButton: {
        position: 'absolute',                                          
        bottom: 100,                                                    
        right: 10,
        width: 64,
        height: 64,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'baseline'
    },

    secondaryFunctionButtonIcon: {
        alignSelf: 'center',
        color: '#EC5805',
    },

    navigationCurrentIcon: {
        borderRadius: 50,
        backgroundColor: '#EC5805',
        color: '#EC5805',
    },

    powerLevelImage:{
        height: 25,
        width: 25
    },

    popupContent: {
        padding: 22,
        borderRadius: 4,
        borderColor: "black"
    },

    popupContainer: {
        backgroundColor: "#292C2F",
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        justifyContent: "space-between",
        flexDirection: 'row',
    },

    popupPowerLevelRow: {
        justifyContent: "center",
        flexDirection: 'row',
    },

    innnerPopupContainer: {
        alignItems: "center",
    },

    popupContainerItem: {
        paddingTop: 8,
    },

    popupContainerItemHeader: {
        paddingTop: 8,
        fontSize: 14,
        color: "white",
        fontWeight: "bold"
    },

    popupContainerItemData: {
        paddingTop: 8,
        color: "#9e9e9e"
    },
    
});