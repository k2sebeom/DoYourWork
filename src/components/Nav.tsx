import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { addDay } from "../utils/date";


const Nav = ({ today, setToday }: any) => {

    return (
        <View style={styles.layout}>
            <TouchableOpacity
                onPress={() => {
                    setToday(addDay(today, -1));
                }}
            >
                <Text style={styles.whiteText}>{"<"}</Text>
            </TouchableOpacity>
            
            <Text style={styles.whiteText}>{today}</Text>

            <TouchableOpacity
                onPress={() => {
                    setToday(addDay(today, 1));
                }}
            >
                <Text style={styles.whiteText}>{">"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        paddingTop: 10,
        paddingBottom: 10
    },
    whiteText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
        marginRight: 15
    }
})

export default Nav;