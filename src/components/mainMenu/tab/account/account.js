import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';

/**
 * The component below appears when main menu is displayed and Account Settings tab is selected.
 * Contains main user related settings.
 */
export default class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            picture: null
        }
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
                    
                    <Text style={styles.contentTextHeader}>username</Text>
                    <Text style={styles.contentTextDescription}>user mailbox</Text>
                </View>
                
                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => console.log()}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'arrows-v'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Height</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => console.log()}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'cubes'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Weight</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => console.log()}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'intersex'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Gender</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => console.log()}>
                        <View style={styles.containerInSection}>
                            <View style={styles.containerInnerSection}>
                                <Icon name={'calendar'} size={24} style={styles.iconLeft} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>Age</Text>
                                <Icon name={'angle-right'} size={24} style={styles.iconRight} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerSettings}>
                    <TouchableOpacity onPress={() => console.log()}>
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