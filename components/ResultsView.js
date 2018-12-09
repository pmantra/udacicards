import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { Button, Divider } from 'react-native-elements'

function restartQuiz(resetQuiz) {
    resetQuiz()
}

function backToDecks(navigation) {
    navigation.goBack()
}

export default ResultsView = (props) => {
    const { title, correctPercent, incorrectPercent, navigation, resetQuiz } = props
    return (
        <View>
            <Text style={styles.resultsLabel}>Quiz Results</Text>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={styles.resultsContainer}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 100}}>
                            <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold', color: 'gray'}}>Deck</Text>
                        </View>
                        <View style={{width: 200}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>{title}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.resultsContainer}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 100}}>
                            <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold', color: 'gray'}}>Correct</Text>
                        </View>
                        <View style={{width: 75}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>{correctPercent}%</Text>
                        </View>
                        <View style={{width: 125, height: 50}}>
                            <Progress.Bar
                                color='green'
                                progress={correctPercent/100}
                                width={150}
                                height={20} />
                        </View>
                    </View>
                </View>
                <View style={styles.resultsContainer}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 100}}>
                            <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold', color: 'gray'}}>Incorrect</Text>
                        </View>
                        <View style={{width: 75}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>{incorrectPercent}%</Text>
                        </View>
                        <View style={{width: 125, height: 50}}>
                            <Progress.Bar
                                color='red'
                                progress={incorrectPercent/100}
                                width={150}
                                height={20} />
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <Button
                        backgroundColor='black'
                        color='white'
                        title='Restart Quiz'
                        onPress={() => restartQuiz(resetQuiz)}/>
                        <Divider style={{  margin: 10 }} />
                    <Button
                        backgroundColor='#cbcbcb'
                        color='black'
                        title='Back To Deck'
                        onPress={() => backToDecks(navigation)}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    resultsLabel: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
    resultsContainer: {
        marginTop: 50,
        marginLeft: 10
    },
    buttonContainer: {
        paddingTop: 250,
    }
})