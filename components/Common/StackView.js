import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Tabs from './Tabs';
import DeckDetails from '../DeckDetails';
import StartQuiz from '../StartQuiz';
import AddQuestion from '../AddQuestion';
import { orange, white } from '../../libs/colors';

const stackOptions = {
    'home': {
        screen: Tabs,
    },
    'deckDetails': {
        screen: DeckDetails
    },
    'startQuiz': {
        screen: StartQuiz
    },
    'addQuestion': {
        screen: AddQuestion
    }
};
const stackConfig = {
    navigationOptions: {
        headerTintColor: white,
        headerStyle: {
            backgroundColor: orange,
        }
    }
};
export default createStackNavigator(stackOptions, stackConfig);