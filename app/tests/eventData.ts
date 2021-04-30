import tests from "../config/tests";
import assets from "../config/assets";

export default function(amount: number) {
    let final = []
    let currentDate = 1
    // console.log("Start")

    for(let i =1; i <= amount; i++) {


        let date = `2021-04-${currentDate < 10 ? `0${currentDate}` : currentDate}`
        console.log(date)

        let current = {
                id: i,
                title: `Event ${i}`,
                manager: `Manager ${i}`,
                description: tests.huge,
                image: tests.image,
                profile: assets.testing.profilePicture,
                attendees: [],
                date: date,
                time: {hour: 1, minute: 30, morning: false},}

        final.push(current)

        if(i%5===0) {
            currentDate++
        }
    }

    return final;
}