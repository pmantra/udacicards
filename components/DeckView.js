import React, { Component } from 'react'
import { View, Text, Keyboard, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    componentDidMount () {
        Keyboard.dismiss()
    }

    handleAddNewCard (deck) {
        const { title } = deck
        this.props.navigation.navigate(
            'Card',
            { title }
        )
    }

    handleStartQuiz () {
        alert('Start quiz')
    }

    handleDeleteDeck () {
        alert('Delete deck')
    }

    render () {
        const { deck } = this.props
        const { questions } = deck
        const numberOfCards = questions.length
        return (
            <View style={{flexDirection:'column', alignItems: 'center', paddingTop: 50, justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'normal' ,fontSize: 20, color: 'black'}}>
                    There are {numberOfCards === 0 ? 'no' : numberOfCards} cards in this deck
                </Text>
                <View></View>
                <View style={{flexDirection:'column', alignItems: 'center', paddingTop: 50, justifyContent: 'space-between'}}>
                    <Button
                        onPress={() => this.handleAddNewCard(deck)}
                        title="Add Card"
                        color='black' />
                    <View style={{paddingTop: 30}}></View>
                    <Button
                        onPress={this.handleStartQuiz}
                        title="Start Quiz"
                        color='#8181a0' />
                    <View style={{paddingTop: 200}}></View>
                    <TouchableOpacity onPress={this.handleDeleteDeck}>
                        <Text style={styles.delete}>
                            <FontAwesome name='trash' size={30} color='red' />{' '}Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (decks, { navigation }) => {
    const { title } = navigation.state.params
    return {
        deck: decks[title]
    }
}

export default connect(mapStateToProps)(DeckView)

const styles = StyleSheet.create({
    delete: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        fontWeight: '400'
    }
})
