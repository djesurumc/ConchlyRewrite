import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import data from "./data.js";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
    <Transition.Together>
        <Transition.In type="fade" durationMs={200}/>
        <Transition.Change />
        <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
)


export default function TestGrowth() {

    

    const ref = React.useRef();
    const [currentIndex, setCurrentIndex] = useState(null);

    const changeIndex =(index)=> {
        ref.current.animateNextTransition();
        setCurrentIndex(index === currentIndex ? null : index)
    }
    return (
        <Transitioning.View 
        ref={ref}
        transition={transition}
        style={styles.container}

        >
            <StatusBar hidden />
            {data.map(({ bg, color, category, subCategories }, index) => {
                return (<TouchableOpacity  key ={category} activeOpacity={0.9} onPress={() => {changeIndex(index)}} style={styles.cardContainer}>
                        <View style={[styles.card, {backgroundColor: bg}]}>
                            <Text style={[styles.heading, { color }]}>{category}</Text>
                            {
                            index === currentIndex && (
                            <View style={styles.subCategoriesList} >
                                {subCategories.map(subCategory => (
                                    <Text style={[styles.body, { color }]} key={subCategory}>{subCategory}</Text>
                                ))}
                            </View>
                            )
                            }
                        </View>
                </TouchableOpacity>
                )
            })}
        </Transitioning.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    cardContainer: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    heading: {
        fontSize: 38,
        fontWeight: "900",
        textTransform: 'uppercase',
        letterSpacing: -2,
    },
    body: {
        fontSize: 20,
        lineHeight: 20 * 1.5,
        textAlign: "center",   
    },
    subCategoriesList: {
        marginTop: 20,
    }
})
