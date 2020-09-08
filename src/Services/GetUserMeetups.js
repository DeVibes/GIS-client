import { setMeetupsAction } from '../StateManagement/actions/userMeetups'

export const getUserMeetups = async () => {
    //TODO fetch from server

    setMeetupsAction([
        {
            meetupId: 1,
            meetupName: `Mark`,
            meetupCategory: `cars`,
            meetupDate: `1/1/1`,
            meetupAddress: `Tsadi Gimel Banot St 42, Rishon LeTsiyon, Israel`,
            meetupCoords: {
                lat: 31.96750948533345,
                lng: 34.80894748150635
            }
        },
        {
            meetupId: 2,
            meetupName: `Leon`,
            meetupCategory: `games`,
            meetupDate: `1/1/1`,
            meetupAddress: `Simtat Betsal'el 9, Rishon LeTsiyon, Israel`,
            meetupCoords: {
                lat: 31.962649,
                lng: 34.805643
            }
        }
    ])
}