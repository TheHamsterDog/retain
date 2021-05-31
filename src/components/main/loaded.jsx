import React from 'react';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ls from 'local-storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArchiveIcon from '@material-ui/icons/Archive';
import Labels from "../sub/labels";
import NavBar from "../sub/navigation"
import Notes from "../sub/notes"



const Loaded = () => {
    const [state, setState] = React.useState({
        new: { title: "", canvas: [], images: [], list: false, description: "", color: "default", labels: [], pinned: false, archived: false }, showRest: false, pastStates: [{ title: "", set: true, canvas: [], images: [], archived: false, list: false, description: "", color: "default", labels: [], pinned: false }], availableLabels: [], current: 0, showDetails: false, addingLabel: false, addingImage: false, addingDrawing: false, labelSearchText: "", notes: [], showNoteDetails: null, addingNoteLabel: null, addingNoteDrawing: null, labelNoteSearchText: "", editingNote: {
            title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
        }, currentHover: null, L: { current: "Notes", new: "", forceSituation: false, situation: "mini-", showModal: false, modalCurrent: -1, editModal: -1, list: [{ name: "Notes", Icon: EmojiObjectsIcon }, { name: "Archived", Icon: ArchiveIcon }, { name: "Edit labels", Icon: EditOutlinedIcon }], customLabels: [] },
        filter: { search: "", archived: false }, loaded: false, themeNumber: 1
    });
    const firstTimeLoad = () => {
        let data = localStorage.getItem('state');
        try {
            if (data) {
                console.log(JSON.parse(data))
                setState(state => ({ ...state, ...JSON.parse(data), loaded: true }));
            }
            else {
                setState((state) => ({ ...state, loaded: true }))
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    if (!state.loaded) {
        firstTimeLoad();
    }
    React.useEffect(() => {
        try {
            localStorage.setItem("state", JSON.stringify({ notes: state.notes, availableLabels: state.availableLabels, themeNumber: state.themeNumber }));
        }
        catch {
            let data = localStorage.getItem('state');
            setState(state => ({ ...state, ...JSON.parse(data), loaded: true }));
            toast.error("You have reached the maximum amount of storage made possible by your browser's localStorage api. You need to delete some of your notes, to make new ones.")
        }
    });

    let theme = state.themeNumber === 1 ? "dark" : "light";
    try {
        return (<div className={theme + "-app"}>
            <ToastContainer />
            <NavBar component themeNumber={state.themeNumber} state={state} setState={setState} />
            <Labels component themeNumber={state.themeNumber} state={state}  setState={setState} />
            <Notes component themeNumber={state.themeNumber} state={state} setState={setState} />
        </div>);
    }
    catch (err) {
        console.log(err);
    }



}
export default Loaded;