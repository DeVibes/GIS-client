// import React, { useState, useRef, useCallback } from 'react'
// // import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from "react-google-maps"
// import { GoogleMap, useLoadScript, useGoogleMap  } from '@react-google-maps/api'

// // import { NewMeetupPopup } from '../Global/NewMeetupPopup'
// // import { EditMeetupPopup } from '../Global/EditMeetupPopup'
// // import { GetLocationByCoords } from '../Services/GetLocationByCoords'

// const googleMapLibraries = [`places`]
// const mapContainerStyle = {
//     width: `100vw`,
//     height: `100vh`
// }
// const rishonLatLong = {
//     lat: 31.962649,
//     lng: 34.805643
// }

// // export const MapPage = () => {
// //     const {isloaded, loadError} = useLoadScript({
// //         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// //         libraries: ["places"]
// //     })

// //     if (loadError) return `error loading map`

// //     return (
// //         <GoogleMap
// //             googleMapURL={urlProp}
// //             loadingElement={<div style={{ height: `100%` }} />}
// //             containerElement={<div style={{ height: `100vh` }} />}
// //             mapElement={<div style={{ height: `100%` }} />}
// //         />
// //     )
// // }

// export const MapPage = () => {
//     // const [newMeetupOpen, setNewMeetupOpen] = useState(false);
//     // const [selectedMeetup, setSelectedMeetup] = useState(null)
//     // const [selectedPoint, setSelectedPoint] = useState({
//     //     address: null,
//     //     coords: {
//     //         lat: null,
//     //         lng: null
//     //     }
//     // })
    
//     // const [meetups, setMeetups] = useState([
//     //     {
//     //         meetupId: 1,
//     //         meetupName: `Mark`,
//     //         meetupCategory: `cars`,
//     //         meetupDate: `1/1/1`,
//     //         meetupAddress: `Tsadi Gimel Banot St 42, Rishon LeTsiyon, Israel`,
//     //         meetupCoords: {
//     //             lat: 31.96750948533345,
//     //             lng: 34.80894748150635
//     //         }
//     //     },
//     //     {
//     //         meetupId: 2,
//     //         meetupName: `Leon`,
//     //         meetupCategory: `games`,
//     //         meetupDate: `1/1/1`,
//     //         meetupAddress: `Simtat Betsal'el 9, Rishon LeTsiyon, Israel`,
//     //         meetupCoords: {
//     //             lat: 31.962649,
//     //             lng: 34.805643
//     //         }
//     //     }
//     // ])

//     const { isloaded, loadError } = useLoadScript({
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//         libraries: googleMapLibraries
//     })

//     const renderMap = () => {
//         // wrapping to a function is useful in case you want to access `window.google`
//         // to eg. setup options or create latLng object, it won't be available otherwise
//         // feel free to render directly if you don't need that
//         const onLoad = useCallback(
//           function onLoad (mapInstance) {
//             // do something with map Instance
//           }
//         )
//         return (
//             <GoogleMap
//                 options={options}
//                 onLoad={onLoad}
//             >
//             {
//                 // ...Your map components
//             }
//             </GoogleMap>
//         )
//       }

//     // if (loadError) return `error loading map`

//     // const handleClick = (e) => {
//     //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${ e.latLng.lng()}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, {mode: 'cors'})
//     //     .then(response => response.json())
//     //     .then(responseJson => {
//     //         let address = responseJson.results[0].formatted_address
//     //         setSelectedPoint({
//     //             coords: {
//     //                 lat: e.latLng.lat(),
//     //                 lng: e.latLng.lng()
//     //             },
//     //             address: address
//     //         })
//     //         setNewMeetupOpen(true)
//     //     })
//     // };

//     // const handleMarkerClick = (meetup) => {
//     //     setSelectedMeetup(meetup)
//     // }
    
//     // const handleClose = () => setNewMeetupOpen(false)
            
//     // const onSubmit = (newMeetup) => {
//     //     handleClose()
//     //     setMeetups(meetups => [...meetups, newMeetup])
//     // }

//     return (
//         <div>
//             <GoogleMap
//             // defaultZoom = {15}
//             // defaultCenter = {rishonLatLong}
//                 // onClick={(event) => {handleClick(event)}}
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={15}
//                 center={rishonLatLong}
//             >
//                 {/* {meetups.map((meetup) => (
//                     <Marker
//                         position={meetup.meetupCoords}
//                         icon={{
//                             url: `/${meetup.meetupCategory}.png`,
//                         }}
//                         onClick={() => {handleMarkerClick(meetup)}}
//                     />
//                 ))}
//                 <NewMeetupPopup open={newMeetupOpen} onClose={handleClose} onSubmit={onSubmit} selectedPoint={selectedPoint}/>
//                 {/* {selectedMeetup && (
//                     <InfoWindow 
//                         position={selectedMeetup.meetupCoords}
//                         onCloseClick={() => setSelectedMeetup(null)}
//                     >
//                         <div>{selectedMeetup.meetupName}</div> 
//                     </InfoWindow>
//                 )} */} 
//             </GoogleMap>
//         </div>
//     )
// }

// // const WrappedMap = withScriptjs(withGoogleMap(MapComponent))


