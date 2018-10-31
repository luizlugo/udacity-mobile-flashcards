import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { white, black, orange } from '../libs/colors';
// Components
import Button from './Common/Button';
// Actions
import { handleNewDeck } from '../actions/decks';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white
    },
    h1: {
        fontSize: 20,
        color: black
    },
    txt: {
        height: 60,
        borderColor: black,
        borderWidth: 1,
        color: orange,
        backgroundColor: white,
        marginTop: 10,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        textAlign: 'center',
    }
});
class NewDeck extends React.Component {
    state = {
        name: '',
        invalidForm: true
    };

    onChangeText = (_value) => {
        this.setState(() => ({
            name: _value
        }), this.validateForm);
    };

    validateForm = () => {
        if (this.state.name && this.state.name !== '') {
            this.setState(() => ({
                invalidForm: false
            }))
        } else {
            this.setState(() => ({
                invalidForm: true
            }))
        }
    }

    onPress = () => {
        const { dispatch, navigation } = this.props;
        const { name } = this.state;
        Keyboard.dismiss();
        dispatch(handleNewDeck({
            name
        })).then((_deckId) => {
            this.setState(() => ({
                name: ''
            }));
            navigation.navigate('deckDetails', {
                deckId: _deckId
            });
        });        
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.h1}>Enter the name of your new deck</Text>
                <TextInput
                    style={styles.txt}
                    value={this.state.name}
                    onChangeText={this.onChangeText}
                    underlineColorAndroid='transparent'
                />
                <Button name='Save' onPress={this.onPress} disabled={this.state.invalidForm} />
            </KeyboardAvoidingView>
        )
    }
}
export default connect()(NewDeck);