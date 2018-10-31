import React from 'react';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
// Custom libraries
import { isIOS } from '../../libs/utils';
import { orange, white } from '../../libs/colors';
// Components
import Decks from '../Decks';
import NewDeck from '../NewDeck';

const tabs = {
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='list' size={30} color={tintColor}></FontAwesome>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='md-add' size={40} color={tintColor}></Ionicons>
        }
    },
};
const tabsConfig = {
    tabBarOptions: {
        activeTintColor: isIOS ? orange : white,
        style: {
            height: 56,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            backgroundColor: isIOS ? white : orange,
            shadowRadius: 6,
            shadowOpacity: 1
        }
    },
};

const tabsNavigator = isIOS ? createBottomTabNavigator(tabs, tabsConfig) : createMaterialTopTabNavigator(tabs, tabsConfig);
export default tabsNavigator;