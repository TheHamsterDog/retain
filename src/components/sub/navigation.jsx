import SearchIcon from '@material-ui/icons/SearchOutlined';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '@material-ui/icons';
import ViewStreamIcon from '@material-ui/icons/ViewAgendaOutlined';

import React from 'react';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AppsIcon from '@material-ui/icons/Apps';

const NavBar = (props) => {
    const number = props.themeNumber;
    const theme = number === 1 ? "dark-" : "light-";
    const [state, setState] = React.useState({ searchSelected: false, settingsSelected: false })
    return (
        <div className={theme + "navbar"}>
            <div className={theme + "navbar-logo"}>
                <img src="https://image.flaticon.com/icons/png/512/107/107788.png" alt="logo-img" className={theme + "navbar-logo-img"} />
                <h1 className={theme + "navbar-logo-content"}>Retain</h1>
            </div>
            <div className={state.searchSelected ? theme + "navbar-search-current" : theme + "navbar-search"} style={{transition: "all 0.2s" }}>
                <SearchIcon className={state.searchSelected ? theme + "navbar-search-current-icon" : theme + "navbar-search-icon"} />
                <input value={props.state.filter.search} onChange={(e) => {
                    props.setState(state => ({ ...state, filter: { ...state.filter, search: e.target.value } }))
                }} type="text" onBlur={() => setState(state => ({ ...state, searchSelected: false }))} onFocus={() => setState(state => ({ ...state, searchSelected: true }))} placeholder="Search" className={state.searchSelected ? theme + "navbar-search-current-input" : theme + "navbar-search-input"} />
                <CloseIcon className={state.searchSelected ? theme + "navbar-search-current-icon" : theme + "navbar-search-icon"} style={!state.searchSelected ? { opacity: 0, transition: "all 0s" } : { opacity: 1, transition: "all 0.2s" }} onClick={() => {
                    props.setState(state => ({ ...state, filter: { ...state.filter, search: "" } }))
                }} />
            </div>
            <div className={theme + "navbar-options"}>
                <RefreshIcon className={theme + "navbar-options-item-icon"} onClick={() => {
                    document.location.reload();
                }} />

                <div style={{ display: "inline", position: "relative" }}>
                    <SettingsIcon className={theme + "navbar-options-item-icon"} onClick={() => {
                        setState(state => ({ ...state, settingsSelected: !state.settingsSelected }))
                    }} />
                    {state.settingsSelected ? <div className={theme + "navbar-options-item-icon-settings"} >
                        <div className={theme + "navbar-options-item-icon-settings-option"} onClick={() => {
                            localStorage.clear();
                            props.setState({
                                new: { title: "", canvas: [], images: [], list: false, description: "", color: "default", labels: [], pinned: false, archived: false }, showRest: false, pastStates: [{ title: "", set: true, canvas: [], images: [], archived: false, list: false, description: "", color: "default", labels: [], pinned: false }], availableLabels: [], current: 0, showDetails: false, addingLabel: false, addingImage: false, addingDrawing: false, labelSearchText: "", notes: [], showNoteDetails: null, addingNoteLabel: null, addingNoteDrawing: null, labelNoteSearchText: "", editingNote: {
                                    title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
                                }, currentHover: null, L: { current: "Notes", new: "", forceSituation: false, situation: "mini-", showModal: false, modalCurrent: -1, editModal: -1, list: [{ name: "Notes" }, { name: "Archived" }, { name: "Edit labels" }], customLabels: [] },
                                filter: { search: "", archived: false }, loaded: false, themeNumber: 1
                            })
                            // document.location.reload();
                        }}>
                            Clear All Saved Data
                        </div>
                        <div className={theme + "navbar-options-item-icon-settings-option"} onClick={() => {
                            props.setState(state => ({ ...state, themeNumber: state.themeNumber === 0 ? 1 : 0 }));
                        }}>
                            {theme === "dark-" ? "Enable light mode" : "Enable dark mode"}
                        </div>
                    </div> : null}
                </div>

            </div>

        </div>
    )

}
export default NavBar;