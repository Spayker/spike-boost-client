import React from 'react'
import globals from '../globals'
import AsyncStorage from '@react-native-community/async-storage'
import APIKit from '../rest/apiKit'

export default class AccountRequests extends React.Component {

    signUp = (email, name, password) => {
        console.debug('Account signUp: ' + email + ' ' + password)

        const body = JSON.stringify({
            id:	            -1,
            name:           '',
            email:          email,
            createdDate:	null,
            modifiedDate:	null,
            age:			35,
            gender:		    null,
            weight:		    75,
            height:		    175,
            password:       password
        })

        return APIKit.post(globals.GE_SERVER_CREATE_NEW_ACCOUNT_URL_ADDRESS, body, { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => { 
            const  data = response.data
            console.debug('account signUp: ' + data)
            this.storeAccountData(name, password)
            return this.getAccessToken(email, password)
        })
        .catch(error => {console.debug('AccountRequests.js [signUp]: error - ' + error )})
    }

    getAccessToken = (email, password) => {
        console.debug('AccountRequests.js [getAccessToken] email - ' + email)
        var details = {
            "scope": "ui",
            "username": email,
            "password": password,
            "grant_type": "client_credentials"
        }
        
        var formBody = []
        for (var property in details) {
          var encodedKey = encodeURIComponent(property)
          var encodedValue = encodeURIComponent(details[property])
          formBody.push(encodedKey + "=" + encodedValue)
        }
        formBody = formBody.join("&")

        return APIKit.post(globals.GE_SERVER_GET_ACCOUNT_TOKEN_URL_ADDRESS, formBody, { headers: {
                Authorization: 'Basic YnJvd3Nlcjo=',
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => { 
            const  data = response.data
            console.debug('AccountRequests.js [getAccessToken]: response data - ' + JSON.stringify(data))
            if(data.access_token === undefined){
                console.debug('AccountRequests.js [getAccessToken]: account login finished. Message - ' + data.message)
                return false
            } else {
                this.storeData(data.access_token, email)
                return true
            }
        })
        .catch(error => {console.debug('AccountRequests.js [getAccessToken]: error - ' + error )})
    }

    updateProfile = async () => {
        let username = null
        let email = null
        let password = null
        let userToken = null
        try {
            username  = await AsyncStorage.getItem(globals.USERNAME_KEY)
            email     = await AsyncStorage.getItem(globals.USER_EMAIL_KEY)
            password  = await AsyncStorage.getItem(globals.USER_PASSWORD_KEY)
            userToken =  await AsyncStorage.getItem(globals.ACCESS_TOKEN_KEY)
        } catch (error) { console.error('AccountRequests.js [updateProfile]: couldn\'t save data related to sign up procedure. ' + error) }

        console.debug('AccountRequests.js [updateProfile]: Account update for ' + username + ' ' + email + ' ' + password)

        const formBody = JSON.stringify({
            name:     username,
            email:    email,
            password: password
        })

        return APIKit.put(globals.GE_SERVER_USER_AUTH_URL_ADDRESS, formBody, { headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        })
        .then((response) => {
            const data = response.data
            console.debug('AccountRequests.js [updateProfile]: ' + data.message)
            return true 
        })
        .catch((error) => { console.error(error) });


        return fetch(globals.GE_SERVER_USER_AUTH_URL_ADDRESS, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                },
                body: JSON.stringify({
                    name:     username,
                    email:    email,
                    password: password
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.debug('AccountRequests.js [updateProfile]: ' + responseJson)
                return true 
            })
            .catch((error) => { console.error(error) });
    }

    storeData = async (userToken, email) => {
        try {
            let multiDataSet = [
                [globals.ACCESS_TOKEN_KEY, userToken],
                [globals.USER_EMAIL_KEY, email],
            ];
            await AsyncStorage.multiSet(multiDataSet);
        } catch (error) { console.debug('couldn\'t save user access token to storage because of: ' + error) }
    }

    storeAccountData = async (name, password) => {
        try {
            let multiDataSet = [
                [globals.USERNAME_KEY, name],
                [globals.USER_PASSWORD_KEY, password],
            ];
            await AsyncStorage.multiSet(multiDataSet);
        } catch (error) { console.debug('couldn\'t save account data to storage because of: ' + error) }
    }

}