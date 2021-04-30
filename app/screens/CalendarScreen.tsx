import React, {useState} from 'react'
import {StyleSheet, FlatList, Text, Image, View, TouchableOpacity} from 'react-native'
// @ts-ignore
import {CalendarList} from 'react-native-calendars';
import tests from "../config/tests";
import assets from "../config/assets";
import colors from "../config/colors";
import eventData from "../tests/eventData";


type markedDate = {
    string: {
        dots: Array<marketItem>,
        selected: boolean,
        selectedColor: string,
    }
}


type eventDate = {
    date: string,
    events: Array<marketItem>,
}

type marketItem = {
    key: string,
    color: string,
    selectedDotColor: string,
}

const test = [
    {date: '2021-4-29', events:[{key: 'vacation', color: 'red', selectedDotColor: 'blue'},
{key: 'massage', color: 'blue', selectedDotColor: 'blue'},
{key: 'workout', color: 'green', selectedDotColor: 'blue'},]
},

]

const testingMarkers = {'2021-04-29': {selected: false, selectedColor: "", dots: [{key: 'vacation', color: 'red', selectedDotColor: 'blue'},
            {key: 'massage', color: 'blue', selectedDotColor: 'blue'},
            {key: 'workout', color: 'green', selectedDotColor: 'blue'},]}}

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

export default function CalendarScreen() {

    const buildEventsToday = (events: Array<event>, date: string) => {
        let finalList = []

        for (let i = 0; i < events.length; i++) {
            if(events[i].date == date) {
                finalList.push(events[i])
            }

        }

        return finalList
    }

    const buildInitialMarkedDates = (events: Array<event>) => {
        let finalObject = Object.assign({})

        for (let i = 0; i < events.length; i++) {
            let currentDate = events[i].date;
            if(currentDate in finalObject) {
                let currentDot = {key: events[i].id.toString(), color: colors.primary, selectedDotColor: colors.primary}
                finalObject[currentDate].dots.push(currentDot)
            } else {
                let currentDot = {key: events[i].id.toString(), color: colors.primary, selectedDotColor: colors.primary}
                finalObject[currentDate] = {
                        selected: false,
                            selectedColor: "",
                            dots: [currentDot]}}
            }
            return finalObject
        }


    //Use selected date to show items
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [markedDates, setMarkedDates] = useState(buildInitialMarkedDates(eventData(15)));

    // console.log(markedDates)


    const renderEventDots = (eventDates: Array<eventDate>) => {
        let final = Object.assign({});
        for (let i = 0; i < eventDates.length; i++) {
            let current = eventDates[i]
            final[current.date] = {
                selected: false,
                dots: current.events
            }

        }

    }



    // useEffect(() => {
    //     setMarkedDates(datesWithEvents);
    // }, [datesWithEvents]);




    const setNewDaySelected = (date: string) => {
        // const markedDate = Object.assign({});

        const markedDate = Object.assign({}, markedDates)

        if (selectedDate !== "") {
            // @ts-ignore
            markedDate[selectedDate] = {
                // @ts-ignore
                ...markedDate[selectedDate],
                selected: false,
            }
        }



        const dateToBeSelected = Object.assign({})
        dateToBeSelected[date] = {
            // @ts-ignore
            ...markedDate[date],
            selected: true,
            selectedColor: colors.secondary
        }

        const final = Object.assign(markedDate, dateToBeSelected)




        //Need to figure out how to change the selected value of a date, even if marked dates exists before
        setSelectedDate(date);
        setMarkedDates(final);
    };

    // @ts-ignore
    const renderEvent = ({item}) => (
        <TouchableOpacity>
            <EventBox id={item.id} title={item.title} manager={item.manager} description={item.description}
                      image={item.image} attendees={item.attendees} profile={item.profile} date={item.date} time={item.time}/>
        </TouchableOpacity>
    );

    const renderFlatList = () => {
        const filteredEvents = buildEventsToday(eventData(15), selectedDate)

        if (filteredEvents.length < 1) {
            return(
                <View style={{flex: 0.9, justifyContent: "center", alignItems: "center"}} >
                    <Text style={{margin: 5, textAlign: "center"}}>Looks like you're free on this day.
                        Go enjoy yourself or sign up for an event!</Text>
                </View>
            );

        } else {
            return(
                <View style={styles.eventsContainer} >
                    <FlatList
                        data={filteredEvents}
                        renderItem={renderEvent}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            );
        }
    }
    return (
        <View style={{flex: 1}}>
            <View style={styles.calendarContainer}>
                <CalendarList
                    horizontal={true}
                    renderHeader={(date: Date) => {
                        // @ts-ignore
                        const header = date.toString('MMMM yyyy');
                        return (
                            <View style={{width: '100%', marginTop: 15, marginBottom: 10, alignItems: "center"}}>
                                <Text style={styles.dateHeader}>{header}</Text>

                            </View>

                        );
                    }}


                    onDayPress={(day: any) => {
                        setNewDaySelected(day.dateString);
                    }}
                    markedDates={markedDates}

                    markingType={'multi-dot'}

                />


            </View>
            {/*<View style={styles.eventsContainer} >*/}
            {/*    <FlatList*/}
            {/*        data={() => {*/}
            {/*            let unfilteredData = eventData(15)*/}


            {/*        }}*/}
            {/*        renderItem={renderEvent}*/}
            {/*        keyExtractor={item => item.id.toString()}*/}
            {/*    />*/}
            {/*</View>*/}
            {renderFlatList()}

        </View>
    )
}



const EventBox = (event: event) => {

    return(
        <View style={styles.eventBoxContainer} >
            <View style ={{backgroundColor: "", width: "25%"}} >
                <View style={{flex: 1, margin: 5}} >
                    <Image style={{ flex: 1, borderRadius: 5}} source={{uri: event.image}} />

                </View>
            </View>
            <View style ={{backgroundColor: "", justifyContent: "center",width: "50%"}} >
                <Text style={[{marginBottom: 5}, styles.textStyle]}>{event.title}</Text>
                <Text style={styles.textStyle}>{event.manager}</Text>
            </View>
            <View style ={{backgroundColor: "", justifyContent: "center", alignItems: "center",
                width: "25%"}} >
                <Text>
                    {`${event.time.hour}:${event.time.minute} ${event.time.morning ? 'am' : 'pm'}`}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        backgroundColor: "dodgerblue"
    },
    eventsContainer: {
        flex: 0.9,
        backgroundColor: "white"
    },
    eventBoxContainer: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: colors.line,
        borderBottomColor: colors.line,
        flexDirection: "row",
        width: "100%",
        height: 100,
        backgroundColor: "white"
    },
    dateHeader: {
        color: colors.primary,
        fontSize: 20,
    },
    textStyle: {marginLeft: 5},

});
