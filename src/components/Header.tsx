import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';


const Header = ({ phase, setPhase }: any) => {
    return (
        <View style={styles.layout}>
            <TouchableOpacity
                onPress={() => {
                    setPhase(0);
                }}
            >
                <Text style={styles.whiteText}>TODO</Text>
            </TouchableOpacity>
            
            {/* <TouchableOpacity
                onPress={() => {
                    setPhase(2);
                }}
            >
                <FontAwesomeIcon style={styles.whiteIcon} size={25} icon={faCalendarDay} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setPhase(1);
                }}
            >
                <Text style={styles.whiteText}>Workout</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        paddingTop: 15,
        paddingBottom: 15
    },
    whiteText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 15,
        marginRight: 15
    },
    whiteIcon: {
        color: 'white',
        marginVertical: 5
    }
})

export default Header;