import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'

import Header from '../components/Header'
import colors from '../config/colors'
import Options from '../components/Options';
import {EventMenu} from "../components/EventMenu";
import Event from "../components/Event";
import tests from "../config/tests";



export default function MainEventScreen(props: any) {



    return (
        <View style={styles.background} >
            <Header  />

            <EventMenu/>
            {/* <EventMenu title={"EventMenu"} description={tests.description} image={tests.image} /> */}
            {/*<View style=s{{flex: 1, backgroundColor: "blue"}} />*/}

            <Options style={{ flex: 1, justifyContent: "flex-end"}} />

        </View>



    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    testEventContainer: {
        alignSelf: "center",
        // position: position,
        borderRadius: 10,
        width: "100%",
        height: 500,
        margin: 4,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        zIndex: 997,
    },
});
