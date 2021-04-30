type event = {
    id: number,
    title: string,
    manager: string,
    description: string,
    image: string,
    profile: string,
    attendees: Array<string>,
    date: string,
    time: time,
};

type time = {
    hour: number,
    minute: number,
    morning: boolean,
}

