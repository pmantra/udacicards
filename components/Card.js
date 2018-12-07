import React, { Component } from 'react'
import { View, Text, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions'
import { saveCardToDeck } from '../utils/api'

class Card extends Component {

    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: `${title}   ▶   Add Card`
        }
    }

    handleInput = (value, name) => {
        this.setState(() => ({
            [name]: value
        }))
    }

    handleAddNewCard = () => {
        const { question, answer } = this.state
        this.props.saveCard(question,answer)
        this.props.goBack()
    }

    render () {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView style={{flexDirection:'column', alignItems: 'center', paddingTop: 30, paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'normal' ,fontSize: 18, color: 'black'}}>
                    Type a Question and Answer for Your Card
                </Text>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', paddingTop: 50, height: 100}}>
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 20, paddingRight: 20}}
                        onChangeText={(text) => this.handleInput(text,'question')}
                        placeholder='Type your Question'
                        value={question}
                    />
                </View>
                <View style={{paddingTop: 30}}></View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'stretch', paddingTop: 50, height: 100}}>
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 20, paddingRight: 20}}
                        onChangeText={(text) => this.handleInput(text,'answer')}
                        placeholder='Type your Answer'
                        value={answer}
                    />
                </View>
                <View style={{paddingTop: 30}}></View>
                <View style={{paddingTop: 30}}>
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