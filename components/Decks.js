import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import { getDecks, removeDecks } from '../utils/api'
import { formatDecks } from '../utils/helpers'
import { List, ListItem } from 'react-native-elements'

class Decks extends Component {

    state = {
        deckList: []
    }

    componentDidMount() {
        //removeDecks()
        getDecks()
        .then(decks => formatDecks(decks))
        .then((deckList) => this.setState(() => ({
            deckList
        })))
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                }}
            />
        )
    }

    render () {
        const { deckList } = this.state
        if(deckList.length>0) {
            return (
                <List  containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList data={deckList}
                    renderItem={({ item }) => (
                        <ListItem
                        title={`${item.title}`}
                        subtitle={`${item.questions.length} cards`}
                        containerStyle={{ borderBottomWidth: 0 }}
                        />
                    )}
                    ItemSeparatorComponent={this.renderSeparator}
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

export default Decks