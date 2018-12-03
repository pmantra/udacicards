import React, { Component } from 'react'
import { Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {

    state = {
        title: ''
    }

    addNewDeck = () => {
        const { title } = this.state
        saveDeckTitle(title)
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
                        onChangeText={(title) => this.setState({title})}
                        />
                </View>
                <View style={{  flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Button
                    onPress={this.addNewDeck}
                    title="Add"
                    color='black'
                    style={{backgroundColor: 'black', color: 'white'}} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default AddDeck