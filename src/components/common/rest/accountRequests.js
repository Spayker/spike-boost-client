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

    storeData = async (userToken, email) => {
        console.debug('account storeData: userToken ' + userToken)
        console.debug('account storeData: email ' + email)
        try {
            let multiDataSet = [
                [globals.ACCESS_TOKEN_KEY, userToken],
                [globals.USERNAME_TOKEN_KEY, email],
            ];
            await AsyncStorage.multiSet(multiDataSet);
        } catch (error) { console.debug('couldn\'t save user access token to storage because of: ' + error) }
    }

    storeAccountData = async (name, password) => {
        console.debug('account storeAccountData: name ' + name)
        console.debug('account storeAccountData: password ' + password)

        try {
            let multiDataSet = [
                [globals.ACCOUNT_NAME_KEY, name],
                [globals.ACCOUNT_PASSWORD_KEY, password],
            ];
            await AsyncStorage.multiSet(multiDataSet);
        } catch (error) { console.debug('couldn\'t save account data to storage because of: ' + error) }
    }

}