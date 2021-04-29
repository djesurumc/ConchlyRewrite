import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';
import assets from '../config/assets';

function Options(props: any) {
    return (
        <View style={styles.container}>


            <Icon icon={assets.icons.homeLight} />
            <Icon icon={assets.icons.calendarLight} />
            <Icon icon={assets.icons.createLight} />
            <Icon icon={assets.icons.connectionsLight} />
            <Icon isProfile={true} icon={assets.testing.profilePicture} />

        </View>
    );
}

function Icon(props: any) {

    return(
        <TouchableOpacity style={styles.iconContainer} >
            <Image style={props.isProfile ? styles.profileImage : styles.icon} source={props.icon} />
        </TouchableOpacity>


    );
}

const styles = StyleSheet.create({
    container: {
        height: "10%",
        backgroundColor: "#ffff",
        flexDirection: "row",
        // alignItems: "baseline",
        zIndex: 999,
        justifyContent: "center",
        borderTopColor: colors.line,
        borderTopWidth: 1,
    },
    iconContainer: {

        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        // backgroundColor: "tomato",
        // borderColor: "#000",
        // borderWidth: 3,
    },
    icon: {
        marginTop: 10,
        height: 30,
        width: 30,
    },
    profileImage: {
        marginTop: 10,
        height: 30,
        width: 30,
        borderRadius: 30/2,
    }

})

export default Options;