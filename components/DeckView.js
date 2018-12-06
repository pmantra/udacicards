import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        console.log('deck in navigationOptions', title)
        return {
            title
        }
    }

    render () {
        return (
            <View>
                <Text>
                    You are viewing deck view!
                </Text>
            </View>
        )
    }
}

export default connect()(DeckView)
