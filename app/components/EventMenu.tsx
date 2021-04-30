import React, {useRef, useState} from 'react'
import { Image, StyleSheet, Button, Text, View, FlatList, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';

import colors from '../config/colors';
import assets from "../config/assets";
import tests from "../config/tests";
import Event from "../components/Event";
import {Modalize} from "react-native-modalize";
import eventData from "../tests/eventData";


export function EventMenu(props: any) {
    //Make Mocklist
    const eventList = eventData(50)

    const [events, setEvents] = useState<Array<event>>(eventList);



    //Handles Refresg Animation, remember to put the onScroll in flatlist's On Scroll
    const [offsetY, setOffsetY] = useState(0);
    const onScroll =(event: any)=> {
        const { nativeEvent } = event;
        const { contentOffset } = nativeEvent;
        const { y } = contentOffset;
        setOffsetY(y);
    }

    const refreshAnimation = assets.icons.refreshAnimation;

    let progress = 0;
    if (offsetY <= 0) {
        progress = -offsetY / colors.refreshingHeight;
    }


    //Handle Event Page
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [currentManager, setCurrentManager] = useState<string>("");
    const [currentDescription, setCurrentDescription] = useState<string>("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState<string>("");
    const [currentImage, setCurrentImage] = useState<string>("");
    const [currentAttendees, setCurrentAttendees] = useState<Array<string>>([]);

    const updateCurrentEvent = (event: event) => {
        setCurrentTitle(event.title);
        setCurrentManager(event.manager);
        setCurrentDescription(event.description)
        setCurrentImage(event.image)
        setCurrentAttendees(event.attendees)
    }

    //Handles bottom sheet

    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        // bs.current.snapPoints(0)
        modalizeRef.current?.open();
    };



    return (
        <View style={{flex: 1}} >



            <View style={{flex: 1, justifyContent: "center"}}>

                {Math.abs(progress) === 0 ? <View/> : <LottieView
                    style={styles.refresh}
                    source={refreshAnimation}
                    progress={progress}
                />}


                <FlatList
                    keyExtractor={(item: event) => item.id.toString()}
                    data={events}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            updateCurrentEvent(item);
                            onOpen();
                        }}>
                            <View style={{flex: 1}}>
                                <EventView profilePicture={item.profile} title={item.title} description={item.description} image={item.image} />
                            </View>

                        </TouchableOpacity>
                    )}
                    onScroll={onScroll}
                />

                <Modalize
                    ref={modalizeRef}
                    rootStyle={{flex: 1}}
                    modalStyle={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                    modalHeight={650}

                    scrollViewProps={{contentContainerStyle:{flexGrow: 1}}}
                >
                    {/*<View style={{backgroundColor: "dodgerblue", flex: 1}} />*/}
                    <Event title={currentTitle} description={currentDescription} manager={currentManager}
                           image={currentImage} attendees={currentAttendees}  />
                </Modalize>



            </View>

            {/*<Modalize*/}
            {/*    ref={modalizeRef}*/}
            {/*    rootStyle={{flex: 1}}*/}
            {/*    modalStyle={{backgroundColor: "rgba(0, 0, 0, 0)"}}*/}

            {/*    scrollViewProps={{contentContainerStyle:{flex: 1}}}*/}
            {/*>*/}
            {/*    /!*<View style={{backgroundColor: "dodgerblue", flex: 1}} />*!/*/}
            {/*    <Event title={currentTitle} description={currentDescription} manager={currentManager}*/}
            {/*           image={currentImage} attendees={currentAttendees}  />*/}
            {/*</Modalize>*/}
        </View>
    );
}


export function EventView(props: any) {
    // console.log(props.wasPressed === true)
    if (props.wasPressed === true) {
        console.log(props.title)
    }

    return (


        <View style={[styles.eventContainer, {opacity: 1}]} >
            <View style={styles.imageContainer} >

                <Image style={styles.image} source={{uri: props.image}}/>
            </View>

            <Image style={styles.profilePicture} source={props.profilePicture} />


            <View style={styles.titleContainer} >
                <Text style={styles.title} >{props.title}</Text>
            </View>
            {/* <View style={styles.lineAcross} /> */}
            <View style={styles.descriptionContainer} >
                <Text style={styles.description} numberOfLines={2} >{props.description}</Text>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: "100%",
        // flex: 1,
        // resizeMode: "contain"
    },
    imageContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        flex: 1,
    },
    eventsList: {
        // backgroundColor: "tomato",
        flex: 1,
        alignItems: "center",
        // padding: 3,
    },
    eventContainer: {
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
    title: {
        fontSize: 26,
        fontWeight: "bold",
        left: "5%",
    },
    titleContainer: {
        height: "15%",
        justifyContent: "center",
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        bottom: 5,
        padding: 4,
        top: "1%",
    },


    description: {

    },

    descriptionContainer: {
        height: "13%",
        padding: "1%",
        top: "2%",

    },
    profilePicture: {
        width: 100,
        height: 100,
        position: "absolute",
        right: "4%",
        top: "5%",
        alignSelf: "flex-end",
        borderColor: colors.primary,
        borderWidth: 0.25,
        borderRadius: 100/2,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    refresh: {
        height: colors.refreshingHeight,
        alignSelf: "center",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});
