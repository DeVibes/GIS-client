/* Libraries */
import React, { useState } from 'react'
import { AppBar, 
    Toolbar, 
    IconButton, 
    Hidden, 
    CssBaseline, 
    Drawer, 
    Typography, 
    InputBase,
    Menu,
    MenuItem 
} from '@material-ui/core/';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
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
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = styles()

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    const handleAccountOpen = event => setAnchorEl(event.currentTarget)

    const handleAccountClose = () => setAnchorEl(null)

    const handleLogOut = () => {
        console.log(`logging out ...`)
        setAnchorEl(null)
    }

    return (
        <>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleAccountOpen}
                        // className={classes.menuButton}
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleAccountClose}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                    </Menu>
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

