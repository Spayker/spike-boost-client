import React from 'react'
import { View } from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import Home from './tab/home/home';
import MediaList from './tab/mediaList/mediaList';
import Account from './tab/account/account';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MainMenu extends React.Component {

  tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor: '#040d14',
      pressColor: '#EC5805'
    },
    {
      key: 'mediaList',
      icon: 'music-note',
      label: 'Media',
      barColor: '#040d14',
      pressColor: '#EC5805'
    },
    {
      key: 'account',
      icon: 'account',
      label: 'Account',
      barColor: '#040d14',
      pressColor: '#EC5805'
    }
  ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
      <Icon size={24} style={{ color: isActive ? '#EC5805' : 'white' }} name={icon} />
  )
 
  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{ color: isActive ? '#EC5805' : 'white' }}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
        <View style={{ flex: 1 }}>
          
          <View style={{ flex: 1 }}>            
            {
              this.state.activeTab == 'home' &&
                <Home navigation = {this.props.navigation}/>
            }
            {
              this.state.activeTab == 'mediaList' &&
                <MediaList navigation = {this.props.navigation}/>
            }
            {
              this.state.activeTab == 'account' &&
                <Account navigation = {this.props.navigation}/>
            }
          </View>
          
          <BottomNavigation
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            activeTab={this.state.activeTab}
            renderTab={this.renderTab}
            tabs={this.tabs}/>
        </View>
    );
  }
}