import React, {useRef} from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import Event from "../components/Event";
import tests from "../config/tests";
import { Modalize } from 'react-native-modalize';


export default function TestingScreen() {
    const modalizeRef = useRef<Modalize>(null);
    const onOpen = () => {
        modalizeRef.current?.open();
    };


    return (
        <>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
    <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
    </TouchableOpacity>

    </View>

    <Modalize
    ref={modalizeRef}
    scrollViewProps={{contentContainerStyle:{flex: 1}}}
>
    <Event title={"Event"} description={tests.huge} manager={"Blue"}
    image={tests.image} attendees={[]}  />

    </Modalize>
    </>
)
}

const styles = StyleSheet.create({})
