import React from 'react'
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native'
import StorageManager from '../../../common/storage/StorageManager'
import styles from './styles'

const storageManager  = StorageManager.getInstance()

export default class MediaList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            foundMedia: [],
            isConnectedWithMiBand: false
        }
    }

    doSmt(){
        console.log()
    }

    render() {
        return (
            <View style = {styles.container}>
                <FlatList
                    data = {this.state.foundMedia}
                    renderItem = {
                        ({item}) => 
                            item.mediaName === undefined ? (
                                <View/>
                            ) : (
                                <View style={styles.listMediaContainer}>
                                    {/* <Image style={styles.image} source={require('../../../../resources/watch.png')} /> */}
                                    <View style={styles.listMediaColumnData}>
                                        <Text style={styles.item}>{item.mediaName}</Text>
                                        <Text style={styles.item}>{item.mediaFileSize}</Text>
                                    </View>

                                    
                                </View>
                            )
                    }
                    keyExtractor={item => item.mediaFileSize}
                />

                <TouchableOpacity
                        style={styles.addMediaButton}
                        onPress={() => this.doSmt()}>
                        <Text style={styles.addMediaButtonText}>Add</Text>
                </TouchableOpacity>

            </View>
        );
    }

}