import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import globals from "../../../../common/globals"
import AccountRequests from '../../../../common/rest/accountRequests'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-easy-toast'
import styles from './styles'

export default class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
        accountRequests = new AccountRequests()
    }

    componentDidMount = async () => {
        try {
            console.debug('changePassword.js [componentDidMount]: Loading password data from async storage...')
            this.setState({oldPassword: await AsyncStorage.getItem(globals.USER_PASSWORD_KEY)})
        } catch (error) { console.debug(error) }
    }

    updatePassword = async () => {
        const oldPassword = this.state.oldPassword;
        const newPassword = this.state.newPassword;
        const confirmNewPassword = this.state.confirmNewPassword;

        if(oldPassword.length > 0 && newPassword.length > 0 && confirmNewPassword.length > 0) {
            if(newPassword === confirmNewPassword) {
                if (newPassword !== oldPassword) {
                    try {
                        let multiDataSet = [ [globals.USER_PASSWORD_KEY, this.state.newPassword] ];
                        await AsyncStorage.multiSet(multiDataSet);
                        const status = await accountRequests.updateProfile()
                        console.debug('changePassword.js [updatePassword]: password has been updated - ' + status)
                        this.setState({oldPassword: newPassword})
                        this.props.navigation.navigate('Profile')
                    } catch (error) { console.error("changePassword.js [updatePassword]: error has occured. " + error) }
                } else {
                    this.refs.toast.show('NEW and OLD passwords can not be equal...', 1000)
                }
            } else {
                this.refs.toast.show('NEW and REPEAT passwords can not be different...', 1000)
            }
        } else {
            this.refs.toast.show('Password fields can not be empty...', 1000)
            console.debug("changePassword.js [updatePassword]: some password fields are empty...")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputPackage}>

                    <Text style={styles.dataNameTextHeader}>Old password</Text>
                    <TextInput
                        style={styles.dataInputText}
                        editable={false}
                        secureTextEntry={true}
                        placeholder='Old password'
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChangeText={(oldPassword) => this.setState({oldPassword})}
                        id="oldPassword"/>

                    <Text style={styles.dataNameTextHeader}>New password</Text>
                    <TextInput
                        style={styles.dataInputText}
                        editable={true}
                        secureTextEntry={true}
                        placeholder='New password'
                        name="newPassword"
                        value={this.state.newPassword}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        id="newPassword"/>

                    <Text style={styles.dataNameTextHeader}>Repeat new password</Text>
                    <TextInput
                        style={styles.dataInputText}
                        editable={true}
                        secureTextEntry={true}
                        placeholder='Repeat new password'
                        name="repeatNewPassword"
                        value={this.state.confirmNewPassword}
                        onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
                        id="repeatNewPassword"/>

                </View>

                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={() => {this.updatePassword()}}>
                    <Text style={styles.changePasswordButtonText}>Save</Text>
                </TouchableOpacity>

                <Toast ref="toast" positionValue={150}/>
            </View>
        )
    }

}