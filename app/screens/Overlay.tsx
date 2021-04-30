import {StyleSheet, View, ComponentProvider} from "react-native";
import Header from "../components/Header";
import {EventMenu} from "../components/EventMenu";
import Options from "../components/Options";
import colors from "../config/colors";
import React, {ComponentElement} from "react";

type Screen = {
    screen: JSX.Element;
}

export default function Overlay(props: Screen) {
    return (
        <View style={styles.background} >
            <Header  />
            {props.screen}
            <Options style={{ flex: 1, justifyContent: "flex-end"}} />
        </View>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
});