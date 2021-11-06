 import React from 'react';
 import { Text, View, ScrollView, Button } from 'react-native';
 import { createAppContainer, createSwitchNavigator } from 'react-navigation';
 import { createBottomTabNavigator } from 'react-navigation-tabs';
 import { createStackNavigator } from 'react-navigation-stack';
 import { MaterialCommunityIcons } from '@expo/vector-icons';

 import Feed from './feed';
 import Favorites from './favorites';
 import MyNotes from './mynotes';
 import NoteScreen from './note';
 import AuthLoading from './authloading';
 import SignIn from './signin';
 import Settings from './settings';
 import SignUp from './signup';

 const AuthStack = createStackNavigator({
     SignIn: SignIn,
     SignUp: SignUp
 });
 const SettingsStack = createStackNavigator({
     Settings: Settings
 });
 const FeedStack = createStackNavigator({
     Feed: Feed,
     Note: NoteScreen
 });
 const MyStack = createStackNavigator({
     MyNotes: MyNotes,
     Note: NoteScreen
 });
 const FavStack = createStackNavigator({
     Favorites: Favorites,
     Note: NoteScreen
 });

const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Главная',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={24} color={tintColor} />
            )
            }
        },
    MyNoteScreen: {
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: 'Мои заметки',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
            )
            }
        },
    FavoriteScreen: {
        screen: FavStack,
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="star" size={24} color={tintColor} />
            )
         }
        },
        Settings: {
            screen: SettingsStack,
            navigationOptions: {
                tabBarLabel: 'Настройки',
                tabBarIcon: ({ tintColor }) => (
                    <MaterialCommunityIcons name="settings" size={24} color={tintColor} />
                )
            }
        }
});

 const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        App: TabNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }   
);
export default createAppContainer(SwitchNavigator);