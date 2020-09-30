import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StorageManager from '../../../common/storage/StorageManager'
import styles from './styles'
import DocumentPicker from 'react-native-document-picker';

const storageManager  = StorageManager.getInstance()

/**
 * Represents a set of avaialable media content (soundtracks) current user has on smartphone
 */
export default class MediaList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            foundMedia: [],
            isConnectedWithMiBand: false
        }
    }

    /**
     * Calls for document picker dialog for audio file selection
     * Returns: nothing
     * ToDo: remove it once a replacement is ready
     */
    selectTrackFolder = async () => {
        
        // Pick multiple files
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.audio]
            })

            const updatedMedia = []

            for (const res of results) {

                const foundAudioFileData = {
                    mediaName:      res.name,
                    mediaFileSize:  res.size
                }

                updatedMedia.push(foundAudioFileData)
            }
            console.debug('mediaList.js [selectTrackFolder] picked audio files - ' + updatedMedia.length)
            this.setState({foundMedia: updatedMedia})
            console.debug('mediaList.js [selectTrackFolder] foundMedia - ' + this.state.foundMedia)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                
            } else {
                throw err;
            }
        }
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
                                    <Icon name={'music-note'} size={32} style={styles.iconLeft} />
                                    <View style={styles.listMediaColumnData}>
                                        <Text style={styles.item}>{item.mediaName}</Text>
                                        <Text style={styles.item}>~{Math.ceil(item.mediaFileSize / 1024 / 1024)} mB</Text>
                                    </View>
                                </View>
                            )
                    }
                    keyExtractor={item => item.mediaFileSize}
                />

                <TouchableOpacity
                        style={styles.addMediaButton}
                        onPress={() => this.selectTrackFolder()}>
                        <Text style={styles.addMediaButtonText}>Select Folder</Text>
                </TouchableOpacity>

            </View>
        );
    }

}