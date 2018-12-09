import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import { Card, Button, Divider } from 'react-native-elements'
import ResultsView from './ResultsView'

class QuizView extends Component {

    state = {
        questionIndex : 0,
        questionView: true,
        showResults: false,
        correctResponses: 0,
        incorrectResponses: 0,
        cardFlipped: false
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    incrementQuestionCounter = (response) => {
        const { deck } = this.props
        const totalNumberOfQuestions = deck.questions.length
        this.setState((prevState) => ({
            questionIndex: prevState.questionIndex<(totalNumberOfQuestions-1) ? (prevState.questionIndex + 1) : (totalNumberOfQuestions-1),
            questionView: true,
            showResults: prevState.questionIndex === totalNumberOfQuestions-1,
            correctResponses: response === 'correct' ? prevState.correctResponses + 1 : prevState.correctResponses,
            incorrectResponses: response === 'incorrect' ? prevState.incorrectResponses + 1 : prevState.incorrectResponses
        }),() => {
            const {questionView,  cardFlipped} = this.state
            if(questionView === true && cardFlipped === true) {
                this.flipCard()
                this.setState(()=>({
                    cardFlipped: false
                }))
            }
        })
    }

    getProgressText = (deck) => {
        const { questions } = deck
        const { questionIndex } = this.state
        return questions ? `${questionIndex+1}/${questions.length}` : '0'
    }

    handleTextButtonPress = () => {
        this.flipCard()
        this.setState((prevState) => ({
            questionView: !prevState.questionView,
            cardFlipped: !prevState.cardFlipped
        }))
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
        }
    }

    handleResetQuiz = () => {
        this.setState(() => ({
            questionIndex : 0,
            questionView: true,
            showResults: false,
            correctResponses: 0,
            incorrectResponses: 0,
            cardFlipped: false
        }))
    }

    render() {
        const { deck, navigation } = this.props
        const { questions } = deck
        const { questionIndex, questionView, showResults, correctResponses, incorrectResponses } = this.state
        const currentQuestion = questions[questionIndex]
        const totalNumberOfQuestions = questions.length

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        const quizProgress = Number((questionIndex+1)/totalNumberOfQuestions)
        let resultsCorrectPercent = Number((correctResponses/totalNumberOfQuestions)*100)
        resultsCorrectPercent = Number.parseFloat(resultsCorrectPercent).toFixed(2)
        let resultsIncorrectPercent = Number((incorrectResponses/totalNumberOfQuestions)*100)
        resultsIncorrectPercent = Number.parseFloat(resultsIncorrectPercent).toFixed(2)

        return (
            <View style={styles.container}>
                {showResults === false &&
                <View>
                    <View style={styles.progressContainer}>
                        <Progress.Circle
                        style={styles.progress}
                        progress={quizProgress}
                        color='black'
                        size={50}
                        showsText={true}
                        formatText={() => this.getProgressText(deck)}/>
                        <Text style={styles.label}>
                            {questionView === true ? 'Question' : 'Answer'}
                        </Text>
                        <View style={{marginLeft: 50}}>
                            <Text style={styles.correctLabel}>
                                Correct: {correctResponses}
                            </Text>
                            <Text style={styles.inCorrectLabel}>
                                Incorrect: {incorrectResponses}
                            </Text>
                        </View>
                    </View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <Card containerStyle={{padding: 50}}>
                            <Text style={{fontSize: 24, marginLeft: 10}}>
                                {currentQuestion ? currentQuestion.question : ''}
                            </Text>
                        </Card>
                    </Animated.View>
                    <View style={styles.buttonContainer}>
                            <Button
                                backgroundColor='black'
                                color='white'
                                onPress={() => this.incrementQuestionCounter('correct')}
                                title='Correct'/>
                                <Divider style={{  margin: 10 }} />
                            <Button
                                backgroundColor='#cbcbcb'
                                color='black'
                                onPress={() => this.incrementQuestionCounter('incorrect')}
                                title='Incorrect'/>
                    </View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <Card containerStyle={{padding: 50}}>
                            <Text style={{fontSize: 24, marginLeft: 50, marginRight: 50}}>
                                {currentQuestion ? currentQuestion.answer : ''}
                            </Text>
                        </Card>
                    </Animated.View>
                    <View style={styles.textButtonContainer}>
                        <TouchableOpacity onPress={this.handleTextButtonPress}>
                            <Text style={styles.textButton}>
                                {questionView === true ? 'Show Answer' : 'Show Question'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                {showResults === true &&
                    <ResultsView
                    title={deck.title}
                    correctPercent={resultsCorrectPercent}
                    incorrectPercent={resultsIncorrectPercent}
                    numberOfQuestions={totalNumberOfQuestions}
                    navigation={navigation}
                    resetQuiz={this.handleResetQuiz}/>
                }
            </View>
        )
    }
}

const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params
    return {
        deck: decks[title],
        navigation
    }
}

export default connect(mapStateToProps)(QuizView)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 20,
    },
    progressContainer: {
        marginLeft: 30,
        flexDirection: 'row',
    },
    progress: {
        textAlign: 'center',
        fontSize: 20
    },
    textContainer: {
        paddingTop: 50
    },
    text: {
        fontWeight: 'normal',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
    label: {
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    correctLabel: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold'
    },
    inCorrectLabel: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold'
    },
    buttonContainer: {
        paddingTop: 100,
    },
    button: {
        padding: 10,
    },
    textButtonContainer: {
        marginTop: 50
    },
    textButton: {
        textAlign: 'center',
        color: 'blue',
    },
    flipCard: {
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: "absolute",
        top: 0,
        marginLeft: 50,
        marginTop: 50
    }
})