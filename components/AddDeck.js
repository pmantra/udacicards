import React, { Component } from 'react'
import { Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'
import { getNewDeckObject } from '../utils/helpers'
class AddDeck extends Component {

    state = {
        title: ''
    }

    addNewDeck = () => {
        const { title } = this.state
        this.props.addDeck(title)
        this.reset()
        this.props.navigation.navigate(
            'DeckView',
            { title }
        )
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
            <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                }}
            behavior="padding" enabled>
                <View style={{height: 50, alignItems: 'center', paddingTop: 20}}>
                    <Text style={{fontWeight: 'normal' ,fontSize: 20, color: 'black'}}>Give it a name</Text>
                </View>
                <View style={{flex: 1, height: 100}}>
                    <TextInput
                        style={{height: 60, borderColor: 'gray', borderWidth: 2}}
                        placeholder="Enter Name"
                        value={title}
                        onChangeText={this.handleInput}
                        />
                </View>
                <View style={{  flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Button
                    onPress={this.addNewDeck}
                    title="Create Deck"
                    color='black'
                    style={{backgroundColor: 'black', color: 'white'}} />
                </View>
            </KeyboardAvoidingView>
        )
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

export default connect(undefined,mapDispatchToProps)(AddDeck)