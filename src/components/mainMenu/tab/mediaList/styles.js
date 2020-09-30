import { StyleSheet } from 'react-native';

/**
 * MediaList tab component styles component
 */
export default styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#060403",
        padding: 15,
    },

    contentTextDescription:{
        textAlign: "center",
        marginTop: 16,
        color: "#9e9e9e",
        fontSize: 16
    },

    image:{
        alignSelf: "center",
    },

    addMediaButton: {
        marginTop: 10,
        height: 65,
        backgroundColor: "#EC5805",
        borderRadius:30,
        alignItems: 'center'
    },
    
    ItemButton: {
        backgroundColor: "#158A15",
        borderRadius:30,
        alignItems: 'center'
    },

    itemButtonEnabled: {
        width: 75,
        height: 35,
        borderRadius: 30,
        backgroundColor: "#158A15",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        alignItems: 'center'
    },

    itemButtonDisabled: {
        width: 75,
        height: 35,
        borderRadius: 30,
        backgroundColor: "grey",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        alignItems: 'center'
    },

    buttonText: {
        color: "#FFFFFF",
        height: 65,
        fontSize: 16,
        paddingTop: 5
    },

    addMediaButtonText: {
        color: "#FFFFFF",
        height: 65,
        fontSize: 16,
        paddingTop: 20
    },

    listMediaContainer:{
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#333333',
        borderRadius: 5,
        padding: 15,
        marginTop: 5
    },

    listMediaColumnData:{
        alignSelf: "center",
        flexDirection: "column",
    },

    item: {
        fontSize: 18,
        color: "white",
    },

    iconLeft: {
        flex: 1,
        textAlign: 'center',
        color: "white"
    }

});