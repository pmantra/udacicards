import React, { Component } from 'react'
import { FlatList, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { getDecks, removeDecks } from '../utils/api'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'


class Decks extends Component {

    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({
            ready: true
        })))
    }

    renderSeparator = (item,index) => {
        return (
            <View key={index} style={styles.listItemSeperator} />
        )
    }

    onPressDeck = (e, deck) => {
        const { title } = deck
        this.props.navigation.navigate(
            'DeckView',
            { title }
        )
    }

    render () {
        const { ready } = this.state
        const { decks } = this.props
        const deckList = decks !== null ? Object.values(decks).sort((a,b) => a.title > b.title) : []
        if(deckList.length>0 && ready === true) {
            return (
                <List  containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList data={deckList}
                    renderItem={({ item, index }) => (
                        (item !== undefined &&
                            <TouchableOpacity key={item.title} onPress={(e)=>this.onPressDeck(e,item)}>
                                <ListItem
                                    key={item.uuid}
                                    title={`${item.title}`}
                                    subtitle={`${item.questions ? item.questions.length : 0} cards`}
                                    containerStyle={{ borderBottomWidth: 0 }} />
                            </TouchableOpacity>
                        )
                    )}
                    ItemSeparatorComponent={(item,index) => this.renderSeparator(item,index)}
                    keyExtractor={(item) => item.uuid}
                    />
                </List>
                )
        } else if(deckList.length===0 && ready === true) {
            return (
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>No Decks available</Text>
                </View>
            )
        } else {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    listItemSeperator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
    },
    headerContainer: {
        height: 50,
        alignItems: 'center',
        paddingTop: 20
    },
    header: {
        fontWeight: 'normal',
        fontSize: 20,
        color: 'black'
    }
})
