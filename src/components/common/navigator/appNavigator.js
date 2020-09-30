import { createStackNavigator } from 'react-navigation-stack'
import SignInEmail from '../../auth/signIn/email/signInEmail'
import SignUpEmail from '../../auth/signUp/email/signUpEmail'
import MainMenu from '../../mainMenu/mainMenu'
import ChangePassword from '../../mainMenu/tab/account/changePassword/changePassword';

/**
 * AppNavigator component registers all screen components in system.
 * Because of this registration "this.props.navigation.navigate('Screen/Component Name')" becomes possible,
 * where 'this' - current component/screen from where navigation will go next
 */
const AppNavigator = createStackNavigator({
  SignInEmail: {
    screen: SignInEmail,
    navigationOptions: { header: null }
  },
  MainMenu: {
    screen: MainMenu,
    navigationOptions: { header: null }
  },
  SignUpEmail: {
    screen: SignUpEmail,
    navigationOptions: { header: null }
  },
  ChangePassword:{ screen: ChangePassword },
  initialRouteName: 'SignInEmail'
});

export default AppNavigator;