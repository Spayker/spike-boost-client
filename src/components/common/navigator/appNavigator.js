import { createStackNavigator } from 'react-navigation-stack'
import SignInEmail from '../../auth/signIn/email/signInEmail'
import SignUpEmail from '../../auth/signUp/email/signUpEmail'
import MainMenu from '../../mainMenu/mainMenu'

const AppNavigator = createStackNavigator({
  MainMenu: {
    screen: MainMenu,
    navigationOptions: { header: null }
  },
  SignInEmail: {
    screen: SignInEmail,
    navigationOptions: { header: null }
  },
  SignUpEmail: {
    screen: SignUpEmail,
    navigationOptions: { header: null }
  },
  initialRouteName: 'SignInEmail'
});

export default AppNavigator;