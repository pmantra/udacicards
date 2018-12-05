import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { getDecks, removeDecks } from '../utils/api'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { formatDecks } from '../utils/helpers'

class Decks extends Component {

    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props
        //removeDecks()
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({
            ready: true
        })))
    }

    renderSeparator = (item,index) => {
        return (
            <View
                key={index}
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                }}
            />
        )
    }

    render () {
        const { decks } = this.props
        const deckList = decks !== null ? Object.values(decks) : []
        if(deckList.length>0) {
            return (
                <List  containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList data={deckList}
                    renderItem={({ item, index }) => (
                        <ListItem
                        key={item.uuid}
                        title={`${item.title}`}
                        subtitle={`${item.questions ? item.questions.length : 0} cards`}
                        containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    ItemSeparatorComponent={(item,index) => this.renderSeparator(item,index)}
                    keyExtractor={(item) => item.uuid}
                    />
                </List>
                )
        }
        return(
            deckList.length===0 &&
                <View style={{height: 50, alignItems: 'center', paddingTop: 20}}>
                    <Text style={{fontWeight: 'normal' ,fontSize: 20, color: 'black'}}>No Decks available</Text>
                </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks)