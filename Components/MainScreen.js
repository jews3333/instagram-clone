import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomeTab from '../AppTabNavigator/HomeTab'
import SearchTab from '../AppTabNavigator/SearchTab'
import AddMediaTab from '../AppTabNavigator/AddMediaTab'
import LikesTab from '../AppTabNavigator/LikesTab'
import ProfileTab from '../AppTabNavigator/ProfileTab'

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: { screen: HomeTab },
    SearchTab: { screen: SearchTab },
    AddMediaTab: { screen: AddMediaTab },
    LikesTab: { screen: LikesTab },
    ProfileTab: { screen: ProfileTab }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
    },
    iconStyle: { height: 50 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {

  // navigationOptions 코드 추가
  static navigationOptions = {
    header: null
  }

  render() {
    return <AppTabContainet/>
  }
}