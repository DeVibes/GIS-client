/* Libraries */
import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Hidden, CssBaseline, Drawer } from '@material-ui/core/';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240

const styles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
}))

const DrawerWrapper = ({children, mobileOpen, handleDrawerToggle}) => {
    const classes = styles()

    return (
        <nav className={classes.drawer}>
            {/* Mobile */}
            <Hidden mdUp implementation="css"> 
                <Drawer
                    classes={{paper: classes.drawerPaper}}
                    variant="temporary"      
                    anchor="left"
                    open={mobileOpen}  
                    onClose={handleDrawerToggle}    
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}        
                >
                    {children}
                </Drawer>
            </Hidden>
            {/* Desktop */}
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{paper: classes.drawerPaper}}
                    variant="permanent"
                    open
                >
                    {children}
                </Drawer>
            </Hidden>
        </nav>
    )
}

const DrawerBody = () => {
    return (
        <>
            Drawer!
        </>
    )
}

export const MapHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const classes = styles()

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    return (
        <>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DrawerWrapper 
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
            >
                <DrawerBody/>
            </DrawerWrapper>
        </>
    )
}

