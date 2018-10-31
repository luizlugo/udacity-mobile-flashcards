import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Button from './Common/Button';
import { white, gray, orange } from '../libs/colors';
import { clearLocalNotification, setLocalNotification } from '../libs/utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionHolder: {
        padding: 10,
    },
    answerHolder: {
        padding: 10,
    },
    lbl: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    lblAnswer: {
        fontSize: 20,
        color: gray
    }, 
    lblError: {
        marginLeft: 20,
        marginRight: 20,
    },
    bottomButtonContainer: {
        height: 100,
        backgroundColor: orange,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lblBottomButton: {
        color: white,
        fontSize: 30
    }
});
class StartQuiz extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('screenTitle', 'Start Quiz')
        }
    }
    state = {
        actualQuestion: 1,
        correct: 0,
        incorrect: 0,
        showAnswer: false,
        showBottomButton: false,
        showScore: false
    };

    componentDidMount() {
        this.updateTitle();
    }

    updateTitle = () => {
        const { deck, navigation } = this.props;

        if (deck.questions.length > 0) {
            this.props.navigation.setParams({
                screenTitle: `${this.state.actualQuestion}/${deck.questions.length} Cards`
            });
        }
    }

    showAnswer = () => {
        this.setState(() => ({
            showAnswer: true
        }))
    }

    onSuccess = () => {
        this.setState(({ correct }) => ({
            correct: correct + 1,
            showBottomButton: true
        }));
    }

    onIncorrect = () => {
        this.setState(({ incorrect }) => ({
            incorrect: incorrect + 1,
            showBottomButton: true
        }))
    }

    onBottomBtnPressed = () => {
        const { deck } = this.props;
        if (this.state.actualQuestion === deck.questions.length) {
            this.setState(() => ({
                showScore: true
            }));
            clearLocalNotification()
            .then(setLocalNotification)
        } else {
            this.setState(({ actualQuestion }) => ({
                actualQuestion: actualQuestion + 1,
                showAnswer: false,
                showBottomButton: false
            }), this.updateTitle);
        }
    }
    
    onRetry = () => {
        this.setState(() => ({
            actualQuestion: 1,
            correct: 0,
            incorrect: 0,
            showAnswer: false,
            showBottomButton: false,
            showScore: false
        }), this.updateTitle);
    }

    onComplete = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        const { deck } = this.props;
        const { showAnswer, showBottomButton, showScore, actualQuestion, correct, incorrect } = this.state;
        const question = deck.questions[this.state.actualQuestion - 1];
        const totalOfQuestions = deck.questions.length;

        if (totalOfQuestions === 0) {
            return (
                <View style={[styles.container, styles.center]}>
                    <Text style={[styles.lbl, styles.lblError]}>Sorry you cannot take a quiz because there are no cards in the deck.</Text>
                </View>
            );
        }

        if (showScore) {
            return (
                <View style={[styles.container, styles.center]}>
                    <Text style={styles.lbl}>{`Total Questions`}</Text>
                    <Text style={styles.lblAnswer}>{totalOfQuestions}</Text>
                    <Text style={styles.lbl}>{`Answered Correct`}</Text>
                    <Text style={styles.lblAnswer}>{correct}</Text>
                    <Text style={styles.lbl}>{`Answered Incorrect`}</Text>
                    <Text style={styles.lblAnswer}>{incorrect}</Text>
                    <Text style={styles.lbl}>{`Percentage`}</Text>
                    <Text style={styles.lblAnswer}>{`${Math.round(((correct * 100) / totalOfQuestions))}%`}</Text>
                    <Button name="Retry" onPress={this.onRetry} />
                    <Button name="Complete" type="success" onPress={this.onComplete} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.questionHolder}>
                        <Text style={[styles.lbl]}>{question.question}</Text>
                    </View>

                    {!showAnswer && (
                        <Button name="Show Answer" onPress={this.showAnswer} />
                    )}

                    {showAnswer && (
                        <View style={styles.answerHolder}>
                            <Text style={[styles.lbl, styles.lblAnswer]}>{question.answer}</Text>
                        </View>
                    )}

                    {showAnswer && !showBottomButton && (
                        <View>
                            <Button type="success" name="Correct" onPress={this.onSuccess} />
                            <Button type="danger" name="Incorrect" onPress={this.onIncorrect} />
                        </View>
                    )}
                </View>
                {
                    showBottomButton && (
                        <TouchableOpacity style={styles.bottomButtonContainer} onPress={this.onBottomBtnPressed}>
                            <Text style={styles.lblBottomButton}>{ actualQuestion === totalOfQuestions ? 'Complete Quiz' : 'Next Card'}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        );
    }
}
const mapStateToProps = ({ decks }, { navigation: {state: {params: { deckId }}} }) => {
    return {
        deck: decks[deckId]
    }
};
export default connect(mapStateToProps)(StartQuiz);