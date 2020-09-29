import React from 'react'
import { Button, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-community/async-storage';
import styles from "../../styles.js";

/**
 * Component describes sign up screen. Contains couple fields and link to Sign In screen if an user has been already registered in system. 
 */
export default class SignUpEmail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emailValue: 'spykerstar@gmail.com',
      name: 'alex',
      passwordValue: 'qwerty',
      areFieldsFilled: false
    }
  }

  areFieldsFilled(){
    return this.state.emailValue != '' && this.state.passwordValue != '' && this.state.name != ''
  }

  removeSpaces = (str) => { return str.replace(/\s/g, '') }

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
              placeholder='Name'
              placeholderTextColor= "#BDBDBD"
              name='name'
              type='Text'
              id='name'
              value={this.state.name}
              onFocus={() => this.setState({ areFieldsFilled: false})}
              onChangeText={(nameValue) => this.setState({nameValue})}
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
                    onPress={() => this.props.navigation.navigate('MainMenu')}>
                    <Text style={styles.loginButtonText}>SignUp</Text>
            </TouchableOpacity>

          </View>
          
          <View style={styles.textAreaSignUpLink}>
            <Text style={styles.link} onPress={() => {this.props.navigation.navigate('SignInEmail')}}>Already have an account?</Text>
          </View>

        </View>
    );
  }
}