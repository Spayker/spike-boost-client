import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import globals from '../globals'

/**
 * StorageManager component represents CRUD mechanic to work with async storage that is based on SQLite (for Android) db
 * It helps to avoid data wipe out when user decided to do it implicitly.
 */
export default class StorageManager extends React.Component {

    static instance = null;

    /**
     * Part of singleton to return instance of StorageManager component.
     * Returns: instance of StorageManager component 
     */
    static getInstance() {
        if (StorageManager.instance == null) {
            StorageManager.instance = new StorageManager()
        }

        return this.instance;
    }

    /**
     * Inits account related records in async storage. Currently does it for:
     * - ACCOUNTS_KEY
     * 
     * Returns: nothing 
     */
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