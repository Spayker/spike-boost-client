import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#060403",
        padding: 15,
        paddingBottom: 75
    },

    inputPackage: {
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 64
    },

    changePasswordButton: {
        marginTop: 10,
        height: 65,
        backgroundColor: "#EC5805",
        borderRadius:30,
        alignItems: 'center'
    },

    changePasswordButtonText: {
        color: "#FFFFFF",
        height: 65,
        fontSize: 18,
        paddingTop: 20,
        alignItems: 'center'
    },

    dataInputText:{
        fontSize: 20,
        color: 'white',
        
        textAlign: "left",
        borderColor: "#EC5805",
        borderBottomWidth: 1
    },

    dataNameTextHeader: { 
        marginTop: 20,
        fontSize: 18,
        color: "grey" 
    },


});