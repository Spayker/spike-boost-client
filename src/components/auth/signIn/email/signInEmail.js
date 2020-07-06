import React from 'react'
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import StorageManager from '../../../common/storage/StorageManager'
import styles from "../../styles"

export default class SignInEmail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      storageManager: new StorageManager()    
    }
    
  }

  componentDidMount = async () => {
    await this.state.storageManager.initAccountData()
  }

  render() {
    return (
        <View style={styles.imageBackground} >

          <Image style={styles.image} source={require('../../../../resources/sbp_logo.png')} />
          
          <Text style={styles.textHeader}>SpikeBoost</Text>

          <View style={styles.container}>

            <TextInput
              style={styles.dataInputText}
              editable={true}
              placeholder='E-mail'
              placeholderTextColor= "#BDBDBD"
              name="email"
              type="email"
              id="email"
              //value={this.removeSpaces(this.state.emailValue)}
              onFocus={() => this.setState({ areFieldsFilled: false})}
              onChangeText={(emailValue) => this.setState({emailValue: this.removeSpaces(emailValue)})}
              onSubmitEditing={() => this.setState({areFieldsFilled: this.areFieldsFilled()})}/>

            <TextInput
              style={styles.dataInputText}
              editable={true}
              placeholder='Password'
              placeholderTextColor= "#BDBDBD"
              name='password'
              type='password'
              id='password'
              secureTextEntry={true}
              //value={this.state.passwordValue}
              onFocus={() => this.setState({ areFieldsFilled: false})}
              onChangeText={(passwordValue) => this.setState({passwordValue})}
              onSubmitEditing={() => this.setState({areFieldsFilled: this.areFieldsFilled()})}/>

            <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => this.props.navigation.navigate('MainMenu')}>
                    <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

          </View>
          
          <View style={styles.textAreaLoginLink}>
            <Text style={styles.link} onPress={() => {this.props.navigation.navigate('SignUpEmail')}}>Do not have an account?</Text>
          </View>

        </View>
    );
  }
}