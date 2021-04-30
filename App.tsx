import React from 'react';
import MainEventScreen from './app/screens/MainEventScreen';
import {EventMenu} from "./app/components/EventMenu";
import Overlay from "./app/screens/Overlay";
import CalendarScreen from "./app/screens/CalendarScreen";


export default function App() {

  const renderScreen = () => {
    return(
        <CalendarScreen />
    );
  }


  return (
      <Overlay screen={renderScreen()} />
  );
}


