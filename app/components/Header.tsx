import React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import assets from "../config/assets";




function Header(props: any) {
    return (
        <View style={styles.background} >
            <SafeAreaView style={styles.container}>

                <View style={styles.logoContainter}>
                    <Text style={styles.logo}> CONCHLY </Text>

                </View>

                <View style={styles.profileImageContainer}>
                    <TouchableOpacity>
                        <Image style={styles.profileImage} source={assets.icons.emailLight} />
                        {/* <Email style={styles.profileImage}/> */}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fff",
        height: "10%",
        zIndex: 1000,
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingTop: ( Platform.OS === 'android' ) ? 20 : 0
    },
    logo: {
        // fontFamily: "Roboto",
        letterSpacing: 2,
        color: colors.primary,
    },
    logoContainter: {
        alignItems: "flex-start",

        width: 100,
        height: 100,
        // backgroundColor: "tomato",
        position: "absolute",
        top: 50,
        left: 30,
    },
    profileImage: {
        height: 40,
        width: 40,
    },
    profileImageContainer: {
        alignItems: "flex-end",
        width: 100,
        height: 100,
        // backgroundColor: "tomato",
        position: "absolute",
        top: 35,
        right: 30,

    }
})

export default Header;