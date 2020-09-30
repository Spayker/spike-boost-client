import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import globals from '../../../common/globals'
import styles from './styles';

/**
 * The component below appears when main menu is displayed and Account Settings tab is selected.
 * Contains main user related settings.
 */
export default class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "alex",
            email: "spykerstar@gmail.com",
            picture: null
        }
    }

    logOut = async () => {
        try {
            console.debug('account.js [logOut]: account signout...')

            let multiDataSet = [
                [globals.USERNAME_TOKEN_KEY, '']
            ];
            await AsyncStorage.multiSet(multiDataSet);

        } catch (error) { console.error("account.js [logOut]: error has occured. " + error) }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.containerImage}>
                    
                    {this.state.picture === null ? (   
                        <Image style={styles.image} source={require('../../../../resources/user_pick.png')} />    
                    ) : (
                        <FastImage style={styles.image}
                            source={{
                                uri: this.state.picture, 
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.contain} 
                        />
                    )}
                    
                    <Text style={styles.contentTextHeader}>{this.state.name}</Text>
                        <Text style={styles.contentTextDescription}>{this.state.email}</Text>
                </View>
                
                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChangePassword')}}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'expeditedssl'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Change Password</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => {this.logOut(); this.props.navigation.navigate('SignInEmail')}}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'sign-out'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Log out</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}