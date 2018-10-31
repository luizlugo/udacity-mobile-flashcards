import React from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { white, black, orange } from '../libs/colors';
import Button from './Common/Button';
import { handleNewQuestion } from '../actions/decks';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 20,
        marginTop: 20,
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
class AddQuestion extends React.Component {
    static navigationOptions = () => {
        return {
            title: 'Add Card'
        };
    }
    state = {
        question: '',
        answer: '',
        invalidForm: true
    };

    onTextChanged = (_value, _key) => {
        this.setState(() => ({
            [_key]: _value
        }), this.isFormValid);

        // this.isFormValid();
    }

    isFormValid = () => {        
        if ((this.state.question !== '' && this.state.question) && (this.state.answer !== '' && this.state.answer)) {
            this.setState(() => ({
                invalidForm: false
            }));
        } else {
            this.setState(() => ({
                invalidForm: true
            }));
        }
    }

    onSavePressed = () => {
        // Save question
        const { dispatch, deckId, navigation } = this.props;
        const { question, answer } = this.state;
        dispatch(handleNewQuestion({
            question,
            answer,
            deckId
        }));
        Keyboard.dismiss();
        navigation.goBack();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.label}>Enter your question:</Text>
                <TextInput 
                    style={styles.txt}
                    onChangeText={(_value) => this.onTextChanged(_value, 'question')}
                    value={this.state.question}
                />
                <Text style={styles.label}>Enter your answer:</Text>
                <TextInput 
                    style={styles.txt}
                    onChangeText={(_value) => this.onTextChanged(_value, 'answer')}
                    value={this.state.answer}
                />
                <Button name="Save Card" onPress={this.onSavePressed} disabled={this.state.invalidForm}></Button>
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = (state, { navigation }) => {
    return {
        deckId: navigation.state.params.deckId
    }
};
export default connect(mapStateToProps)(AddQuestion);