/* Libraries */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, 
    Collapse, 
    Divider, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Typography,  
    ListSubheader, 
    ListItemSecondaryAction,
    Checkbox,
    Grow,
    TextField,
    MenuItem 
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'

/* Redux */
import { setAttendanceFilter, setCategoriesFilter } from '../../StateManagement/actions/meetupFilterOptions'

/* Services */
import { getAllMeetups } from '../../Services/Meetups'

export const MeetupFilter = () => {
    /* Redux states */
    let meetupsFilters = useSelector(({ meetupsFilters }) => meetupsFilters)
    let userData = useSelector(({ userData }) => userData)

    /* Local states */
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false)

    /* Handlers */
    const handleAttendenceFilter = (event) => {
        let { checked } = event.target
        let username = checked ? userData.username : ""
        setAttendanceFilter(username)
    }

    const handleCategoriesFilter = (event) => {
        let { name, checked } = event.target
        let updatedCategories = meetupsFilters.categories
        if (checked) 
            updatedCategories.push(name)
        else
            updatedCategories.splice(updatedCategories.indexOf(name), 1)

        setCategoriesFilter(updatedCategories)
    }

    const handleApplyClick = () => {
        getAllMeetups(meetupsFilters)
    }

    const isCategoryExist = (categoryValue) => meetupsFilters.categories.some((category) => category === categoryValue)

    return (
        <>
            <List subheader={<ListSubheader>Filter Options</ListSubheader>}>
                <ListItem>
                    <ListItemText primary="Im attending"/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            checked={meetupsFilters.attendance}
                            onChange={handleAttendenceFilter}
                            name="attendance"
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}>
                    <ListItemText primary="By category"/>
                    {isCategoriesVisible ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isCategoriesVisible} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {MeetupCategories.map((category, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    {category.icon}
                                </ListItemIcon>
                                <ListItemText primary={category.label}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleCategoriesFilter}
                                        checked={isCategoryExist(category.value)}
                                        name={category.value}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            <Button onClick={handleApplyClick}>Apply</Button>
        </>
    )
}