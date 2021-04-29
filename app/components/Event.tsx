import React, { useState, useRef } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Button, Text, View } from 'react-native'

import assets from "../config/assets";
import colors from "../config/colors";
import { Modalize } from 'react-native-modalize';


export default function Event(props: any) {
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {

        modalizeRef.current?.open();
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer} >
                <Image style={styles.image} source={{uri: props.image}} />
            </View>

            <View style={styles.headerContainer} >
                <View style={{flex: 0.3, justifyContent: "flex-end",
                    alignItems: "center"}} >
                    <AdjustLabel
                        text={props.title}
                        style={styles.titleFont}
                        fontSize={50}
                        numberOfLines={2}
                    />
                </View>

                <View style={{flex: 0.15, alignItems: "center", justifyContent: "flex-end",
                }} >
                    <Text style={[styles.managerFont]}>
                        by {props.manager}
                    </Text>
                </View>

                <View style={{flex: 0.8, flexDirection: "row"}} >
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <SignUp />
                    </View>
                    <View style={{flex: 0.5, padding: 2,justifyContent: "center", alignItems: "center",
                    }}>
                        <TouchableOpacity style={{flex: 1}} >
                            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center",
                            }}>
                                <Image style={{height: 50, bottom: 0, width: 50}}
                                       source={assets.icons.connectionsLight} />
                            </View>
                            <View style={{flex: 0.7, alignItems: "center"}}>
                                <Text style={{fontSize: 10}}>Who's Attending?</Text>
                            </View>


                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={{height: "40%", marginTop: 4}}>
                <TouchableOpacity>
                    <Text>
                        {props.description}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const SignUp = ({}) => {

    return (
        <TouchableOpacity style={styles.buttonLayout}>
            <View  >
                <Text style={{fontWeight: "bold", fontSize: 20, color: "white"}}>
                    Apply Now
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const AdjustLabel = (props: any) => {
    const [currentFont, setCurrentFont] = useState(props.fontSize);

    return (
        <Text
            numberOfLines={ props.numberOfLines }
            adjustsFontSizeToFit
            style={ [props.style, { fontSize: currentFont }] }
            onTextLayout={ (e) => {
                const { lines } = e.nativeEvent;
                if (lines.length > props.numberOfLines) {
                    setCurrentFont(currentFont - 1);
                }
            } }
        >
            { props.text }
        </Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        backgroundColor: '#fff',
    },

    contentContainer: {
        flexGrow: 1,
    },
    imageContainer: {
        overflow: "hidden",
        // borderRadius: 150/2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // flex: 1,
        height: "40%",
        backgroundColor: "dodgerblue",
    },
    image: {
        flex: 1,
    },
    headerContainer: {
        // flex: 1,
        height: "25%",
        // flexDirection: "row",
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
        borderTopColor: colors.line,
        borderTopWidth: 1,
        // backgroundColor: "tomato",
    },
    scrollView: {
        height: "40%",
        backgroundColor: "tomato"
    },
    textContainer: {
        flex: 1,
    },
    titleFont: {
        fontWeight: "bold",
    },
    managerFont: {
        color: colors.primary
    },
    buttonLayout: {
        flex: 0.6,
        marginHorizontal: 2,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    }

})


