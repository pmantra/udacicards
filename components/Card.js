import React, { Component } from 'react'
import { View, Text, Button, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions'
import { saveCardToDeck } from '../utils/api'

function getSpacer () {
    return (<View style={{paddingTop: 30}}></View>)
}

class Card extends Component {

    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: 'Add Card'
        }
    }

    handleInput = (value, name) => {
        this.setState(() => ({
            [name]: value
        }))
    }

    handleAddNewCard = () => {
        const { question, answer } = this.state
        if(question.trim() !== '' && answer.trim() !== '') {
            this.props.saveCard(question,answer)
            this.props.goBack()
        } else{
            alert('Question/Answer cannot be empty!')
        }
    }

    render () {
        const { question, answer } = this.state
        const { deck } = this.props
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>
                    Deck: {deck.title}
                </Text>
                <Text style={styles.header}>
                    Type a Question and Answer for Your Card
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.handleInput(text,'question')}
                        placeholder='Type your Question'
                        value={question}
                    />
                </View>
                {getSpacer()}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.handleInput(text,'answer')}
                        placeholder='Type your Answer'
                        value={answer}
                    />
                </View>
                {getSpacer()}
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handleAddNewCard}
                        title="Add Card To Deck"
                        color='black' />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params
    return {
        deck: decks[title]
    }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
    const { title } = navigation.state.params
    return {
        saveCard: (question,answer) => {
            const card = { question, answer}
            saveCardToDeck(title, card).then (
                dispatch(addCardToDeck(question, answer, title))
            )
        },
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
    header: {
        fontWeight: 'normal',
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        paddingTop: 50,
        height: 100
    },
    input: {
        margin: 15,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonContainer: {
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})