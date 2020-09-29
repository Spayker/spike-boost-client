import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    imageBackground:{
        width: "100%",
        height: "100%",
        backgroundColor: "black"
    },

    image:{
        alignSelf: "center",
        marginTop: 105
    },

    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 10
    },

    loginButton: {
        marginTop: 10,
        height: 65,
        backgroundColor: "#EC5805",
        borderRadius:30,
        alignItems: 'center'
    },

    loginButtonText: {
        color: "#FFFFFF",
        height: 65,
        fontSize: 16,
        paddingTop: 20,
        alignItems: 'center'
    },

    spacing: {
        padding: 12
    },

    textAreaLoginLink: {
        paddingTop: 75,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    textAreaSignUpLink: {
        paddingTop: 25,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    textHeader: {
        paddingTop: 25,
        fontSize: 30,
        color: "white",
        alignSelf: "center",
    },

    text: {
        color: "white"
    },

    link:{
        color: "#EC5805"
    },

    dataInputText:{
        fontSize: 20,
        color: 'white',
        textAlign: "left",
        height: 60,
        marginTop: 10,
        backgroundColor: "#333333",
        borderBottomWidth: 1
    }
});