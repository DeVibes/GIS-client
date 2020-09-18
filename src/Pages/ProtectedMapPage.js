/* Libraries */
import React from 'react'
import { Route, Redirect } from "react-router-dom";

/* Components */
import { MapPage } from './MapPage'

export const ProtectedMapPage = () => {
    return (
        <>
            {Boolean(localStorage.getItem("loginUser")) ?
                <Route exact path="/map" component={MapPage} />
                :
                <Redirect to="/"/>
            }
        </>
    )
}
