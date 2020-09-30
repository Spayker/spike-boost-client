import React from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import StorageManager from '../../../common/storage/StorageManager'
import AccountRequests from '../../../common/rest/accountRequests'
import styles from "../../styles"

/**
 * Component describes sign in screen. Contains couple fields and link to Sign Up screen if an user has never been registered in system.
 * 
 */
export default class SignInEmail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emailValue: 'spykerstar@gmail.com',
      passwordValue: 'qwerty',
      storageManager: new StorageManager()    
    }
  }

  removeSpaces = (str) =>  { return str.replace(/\s/g,'') }

  componentDidMount = async () => {
    StatusBar.setHidden(true) 
    await this.state.storageManager.initAccountData() 
  }

  signIn = async () => {
    try {
      var accountRequestsObj = new AccountRequests()
      const status = await accountRequestsObj.getAccessToken(this.state.emailValue, this.state.passwordValue)
      console.debug('signInEmail.js [signIn]: SignIn status finished ' + status)
      if (status) {
        this.props.navigation.navigate('MainMenu')
      } else {
        this.refs.toast.show('SignIn failed...', 1000);
      }
    } catch (error) { console.error("signInEmail.js [signIn]: " + error) }
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
              value={this.removeSpaces(this.state.emailValue)}
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
              value={this.state.passwordValue}
              onFocus={() => this.setState({ areFieldsFilled: false})}
              onChangeText={(passwordValue) => this.setState({passwordValue})}
              onSubmitEditing={() => this.setState({areFieldsFilled: this.areFieldsFilled()})}/>

            <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => this.signIn()}>
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