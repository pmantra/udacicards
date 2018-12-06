import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class Card extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: `${title}   ▶   Add Card`
        }
    }

    render () {
        return (
            <View style={{flexDirection:'column', alignItems: 'center', paddingTop: 50, justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'normal' ,fontSize: 20, color: 'black'}}>
                    Add a card to this deck
                </Text>
                <View></View>
                
            </View>
        )
    }
}

export default connect()(Card)