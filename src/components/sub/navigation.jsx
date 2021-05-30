import SearchIcon from '@material-ui/icons/SearchOutlined';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '@material-ui/icons';
import ViewStreamIcon from '@material-ui/icons/ViewAgendaOutlined';

import React from 'react';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AppsIcon from '@material-ui/icons/Apps';

const NavBar = (props) => {
    const number = 1;
    const theme = number === 1 ? "dark-" : "light-";
    const [state, setState] = React.useState({ searchSelected: false })
    return (
        <div className={theme + "navbar"}>
            <div className={theme + "navbar-logo"}>
                <img src="https://image.flaticon.com/icons/png/512/107/107788.png" alt="logo-img" className={theme + "navbar-logo-img"} />
                <h1 className={theme + "navbar-logo-content"}>Retain</h1>
            </div>
            <div className={state.searchSelected ? theme + "navbar-search-current" : theme + "navbar-search"}>
                <SearchIcon className={state.searchSelected ? theme + "navbar-search-current-icon" : theme + "navbar-search-icon"} />
                <input type="text" onBlur={() => setState(state => ({ ...state, searchSelected: false }))} onFocus={() => setState(state => ({ ...state, searchSelected: true }))} placeholder="Search" className={state.searchSelected ? theme + "navbar-search-current-input" : theme + "navbar-search-input"} />
                <CloseIcon className={state.searchSelected ? theme + "navbar-search-current-icon" : theme + "navbar-search-icon"} />
            </div>
            <div className={theme + "navbar-options"}>
                <RefreshIcon className={theme + "navbar-options-item-icon"} />
                <ViewStreamIcon className={theme + "navbar-options-item-icon"} />
                <SettingsIcon className={theme + "navbar-options-item-icon"} />
            </div>
            <div className={theme + "navbar-options"}>

                <AppsIcon className={theme + "navbar-options-item-icon"} style={{ color: "#5F6368", }} />
                <img src="https://avatars.githubusercontent.com/u/58282488?s=400&v=4" className={theme + "navbar-options-item-image"} />

            </div>
        </div>
    )

}
export default NavBar;