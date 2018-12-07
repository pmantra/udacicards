import React, { Component } from 'react'
import { Text, View, TextInput, Button, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'
import { getNewDeckObject } from '../utils/helpers'
class AddDeck extends Component {

    state = {
        title: ''
    }

    addNewDeck = () => {
        const { decks } = this.props
        const { title } = this.state
        if(title.trim() !== '') {
            if(decks[title] === undefined) {
                this.props.addDeck(title)
                this.reset()
                this.props.navigation.navigate(
                    'DeckView',
                    { title }
                )
            } else {
                alert('Deck with that name already exists!')
            }
        } else {
            alert('Deck name cannot be blank!')
        }
    }

    handleInput = (title) => {
        this.setState(() => ({
            title
        }))
    }

    reset = () => {
        this.setState(() => ({
            title: ''
        }))
    }

    render () {
        const { title } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View>
                    <Text style={styles.header}>Give it a name</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type Name"
                        value={title}
                        onChangeText={this.handleInput}
                        />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                    onPress={this.addNewDeck}
                    title="Create Deck"
                    color='black' />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (decks) => {
    return {
        decks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDeck: (title) => {
            const newDeckObject = getNewDeckObject(title)
            saveDeckTitle(newDeckObject)
            .then(dispatch(addNewDeck(newDeckObject)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    header: {
        fontWeight: 'normal',
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
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
        paddingTop: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})