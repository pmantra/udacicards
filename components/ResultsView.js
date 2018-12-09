import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { Button, Divider, Card } from 'react-native-elements'

function restartQuiz(resetQuiz) {
    resetQuiz()
}

function backToDecks(navigation) {
    navigation.goBack()
}

export default ResultsView = (props) => {
    const { title, correctPercent, incorrectPercent, navigation, resetQuiz, numberOfQuestions } = props
    return (
        <View>
            <Card title="Results">
                <View style={styles.resultsRow}>
                    <Text style={styles.rowLabel}>Deck</Text>
                    <Text style={styles.rowValue}>{title}</Text>
                </View>
                <Divider style={{margin:10}}/>
                <View style={styles.resultsRow}>
                    <Text style={styles.rowLabel}>Number of Questions</Text>
                    <Text style={styles.rowValue}>{numberOfQuestions}</Text>
                </View>
                <Divider style={{margin:10}}/>
                <View style={styles.resultsRow}>
                    <Text style={styles.rowLabel}>Correct</Text>
                    <Progress.Bar
                        color='green'
                        progress={correctPercent/100}
                        width={150}
                        height={20}/>
                    <Text style={styles.rowValue}>{correctPercent}%</Text>
                </View>
                <Divider style={{margin:10}}/>
                <View style={styles.resultsRow}>
                    <Text style={styles.rowLabel}>Incorrect</Text>
                    <Progress.Bar
                        color='red'
                        progress={incorrectPercent/100}
                        width={150}
                        height={20} />
                    <Text style={styles.rowValue}>{incorrectPercent}%</Text>
                </View>
            </Card>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
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
        paddingTop: 100,
    },
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    rowLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
    },
    rowValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }

})