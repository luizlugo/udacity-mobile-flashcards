import React from 'react';
import { View, StyleSheet } from 'react-native';
// Redux
import store from './store/';
import { Provider } from 'react-redux';
// Init component
import StackView from './components/Common/StackView';
import CustomStatusBar from './components/Common/CustomStatusBar';
import { white, orange } from './libs/colors';
import { setLocalNotification } from './libs/utils';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={orange} barStyle='light-content' />
          <StackView />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
});
