import React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { black, gray, white } from '../libs/colors';
import Button from './Common/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        paddingLeft: 20,
        paddingTop: 20,
        borderBottomColor: black,
        borderBottomWidth: 1,
        backgroundColor: white
    },
    name: {
        fontSize: 30,
        color: black
    },
    cardsNumber: {
        fontSize: 25,
        color: gray,
        marginTop: 10,
    }
});
export default class DeckRow extends React.Component {
    onRowPressed = () => {
        const { deck, onRowPressed } = this.props;
        onRowPressed(deck.id);
    }

    render() {
        const { deck } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPressed}>
                <View style={styles.container}>
                    <Text style={styles.name}>{deck.name}</Text>
                    <Text style={styles.cardsNumber}>{`${deck.questions.length} cards`}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}