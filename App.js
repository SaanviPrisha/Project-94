import React from 'react';
import { Image } from 'react-native'
import { Icon } from 'react-native-elements'
import WelcomeScreen from './Screens/WelcomeScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import Sidebar from './components/Sidebar'
import WelecomeScreen from './Screens/WelcomeScreen'
import AuthScreen from './Screens/AuthScreen'
import RentScreen from './Screens/RentOutfits'
import OutfitsScreen from './Screens/YourOutfits'
import DetailsScreen from './Screens/DetailsScreen'
import DressDetails from './Screens/DressDetails'
import SettingScreen from './Screens/SettingsScreen'


export default class App extends React.Component {
    render() {
      return (
          <Container />
      );
    }
}

const Stack = createStackNavigator({
  Rent: {screen: RentScreen,
    navigationOptions: {
      headerShown: false
    }},
    Details: { screen: DetailsScreen}
})
const StackNavigation = createStackNavigator({
  Outfits: {screen: OutfitsScreen, navigationOptions: {
    headerShown: false
  }},
  Details: { screen: DressDetails }
})

const Tab = createBottomTabNavigator({
    Rent: {screen: Stack},
    "Your Outfits": {screen: StackNavigation},
  }, {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        var routeName = navigation.state.routeName
        if(routeName == "Rent") {
          return(
            <Image style={{width: 40,height: 40}}source={require('./assets/Rent Clothes.png')}></Image>
          )
        } else if(routeName == "Your Outfits") {
          return(
            <Image style={{width: 40,height: 40}} source={require('./assets/Your Outfits.jpeg')}></Image>
        )
      }
    },
  })
})
const Drawer = createDrawerNavigator({
  Home: {screen: Tab, navigationOptions: {
    drawerIcon: <Icon name="home" type="fontawesome5"/>
  }},
  Settings: { screen: SettingScreen, navigationOptions: {
    drawerIcon: <Icon name="settings" type="fontawesome5"/>
  }},
  },{
  contentComponent: Sidebar
  },{
  initialRouteName: 'Home'
  }
)

const Switch = createSwitchNavigator({
  Welecome: {screen: WelecomeScreen},
  Authentication: {screen: AuthScreen},
  Tab: {screen: Drawer}
})
const Container = createAppContainer(Drawer)