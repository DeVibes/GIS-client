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
    ListSubheader, 
    ListItemSecondaryAction,
    Checkbox,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


/* Components */
import { MeetupCategories } from '../../Data/MeetupCategories'

/* Redux */
import { setAttendanceFilter, setCategoriesFilter, setMineFilter } from '../../StateManagement/actions/meetupFilterOptions'

/* Services */
import { getAllMeetups } from '../../Services/Meetups'

export const MeetupFilter = () => {
    /* Redux states */
    let { attendance, categories, admin } = useSelector(({ meetupsFilters }) => meetupsFilters)
    let userData = useSelector(({ userData }) => userData)

    /* Local states */
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false)

    /* Handlers */
    const handleAttendenceFilter = (event) => {
        let { checked } = event.target
        let username = checked ? userData.username : ""
        setAttendanceFilter(username)
    }
    
    const handleMineFilter = (event) => {
        let { checked } = event.target
        let admin = checked ? userData.username : ""
        setMineFilter(admin)
    }
    
    const handleCategoriesFilter = (event) => {
        let { name, checked } = event.target
        let updatedCategories = categories
        if (checked) 
            updatedCategories.push(name)
        else
            updatedCategories.splice(updatedCategories.indexOf(name), 1)
        setCategoriesFilter(updatedCategories)
    }

    const isCategoryExist = (categoryValue) => categories.some((category) => category === categoryValue)

    return (
        <>
            <List subheader={<ListSubheader>Filter Options</ListSubheader>}>
                <ListItem>
                    <ListItemText primary="Im attending"/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            checked={Boolean(attendance)}
                            onChange={handleAttendenceFilter}
                            name="attendance"
                            color="primary"
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Made by me only"/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            checked={Boolean(admin)}
                            onChange={handleMineFilter}
                            name="mine"
                            color="primary"
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
                                        color="primary"
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            <Divider/>
        </>
    )
}