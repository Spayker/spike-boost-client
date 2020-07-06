import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import globals from '../globals'


export default class StorageManager extends React.Component {

    static instance = null;

    static getInstance() {
        if (StorageManager.instance == null) {
            StorageManager.instance = new StorageManager()
        }

        return this.instance;
    }

    initAccountData = async () => {
        const foundAccounts = await AsyncStorage.getItem(globals.ACCOUNTS_KEY);
        console.debug('foundAccounts: ' + foundAccounts)
        if (foundAccounts === null) {
            try {
                let multiDataSet = [
                    [globals.ACCOUNTS_KEY, JSON.stringify([])]
                ];
                await AsyncStorage.multiSet(multiDataSet);
            } catch (error) { console.debug('couldn\'t save accounts to storage because of: ' + error) }
        }
    }



}