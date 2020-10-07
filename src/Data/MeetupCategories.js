import React from 'react'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MenuBookIcon from '@material-ui/icons/MenuBook';

export const MeetupCategories = [
    {
        value: `beer`,
        label: `Beer night`,
        icon: <LocalBarIcon/>
    },
    {
        value: `games`,
        label: `Board games`,
        icon: <SportsEsportsIcon/>
    },
    {
        value: `cars`,
        label: `Cars`,
        icon: <DirectionsCarIcon/>
    },
    {
        value: `sport`,
        label: `Sport event`,
        icon: <DirectionsRunIcon/>
    },
    {
        value: `lecture`,
        label: `Tech lecture`,
        icon: <MenuBookIcon/>
    },
]
