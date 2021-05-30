import React from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import { useDetectClickOutside } from 'react-detect-click-outside';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { v4 as uuid } from 'uuid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';



import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';


import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';
import SearchIcon from '@material-ui/icons/Search';
import RedoIcon from '@material-ui/icons/Redo';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Canvas, { DisabledCanvas } from './canvas';

let i = 1;
let theme = i === 0 ? "light-" : "dark-";
let notAllowCollapse = false;

const AnotherComponent = (props) => {

    const state = props.state;
    const setState = props.setState;
    console.log(state);
    return (
        <div className={theme + "notes-details"}>
            {state.addingLabel ?
                <div >
                    <h1 className={theme + "notes-details-label-header"} >  Label Note</h1>
                    <div key="a" style={{ position: "relative", padding: "1rem" }}>
                        <input className={theme + "notes-details-label-input"} onChange={(e) => setState(state => ({ ...state, labelSearchText: e.target.value }))} placeholder="Enter label name" />
                        <SearchIcon className={theme + "notes-details-label-input-icon"} />
                    </div>
                    <div key="b" className={theme + "notes-details-label-labels"}>
                        {state.availableLabels.map(label => {
                            console.log(label)
                            return <div className={theme + "notes-details-label-labels-label"}> <input checked={state.new.labels.includes(label)} onChange={(e) => {
                                if (state.new.labels.includes(label)) {
                                    const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    setState(state => ({ ...state, new: { ...state.new, labels: state.new.labels.filter(l => { if (l !== label) { return l } }), pastStates: [...pastStates, { ...state.new, labels: state.new.labels.filter(l => { if (l !== label) { return l } }) }] } }));
                                }
                                else {
                                    const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    setState(state => ({ ...state, new: { ...state.new, labels: [...state.new.labels, label], pastStates: [...pastStates, { ...state.new, labels: [...state.new.labels, label] }] } }));
                                }
                            }} className={theme + "notes-details-label-labels-label-check"} id={"label-" + label} type="checkbox" /><label htmlFor={"label-" + label} className={theme + "notes-details-label-labels-label-font"}  >{label.length < 10 ? label : label.slice(0, 7) + "..."}</label> </div>
                        })}
                    </div>
                    {state.labelSearchText.length > 0 && !state.availableLabels.includes(state.labelSearchText) ? <div className={theme + "notes-details-label-create"}>
                        <AddIcon className={theme + "notes-details-label-create-icon"} />
                        <p className={theme + "notes-details-label-create-text"} onClick={() => {
                            notAllowCollapse = true;
                            setState(state => ({ ...state, availableLabels: [...state.availableLabels, state.labelSearchText] }))
                        }}>Create "{state.labelSearchText.length < 10 ? state.labelSearchText : state.labelSearchText.slice(0, 7) + "..."}"</p>
                    </div> : null}

                </div>
                :

                <div>
                    <div className={theme + "notes-details-list"}>
                        <div onClick={() => { notAllowCollapse = true; setState(state => ({ ...state, addingLabel: true, showRest: true, addingDrawing: false })) }} className={theme + "notes-details-list-item"}>
                            Add Label
                                                </div>
                        <div onClick={() => { setState(state => ({ ...state, addingLabel: false, addingDrawing: true })) }} className={theme + "notes-details-list-item"}>
                            Add Drawing
                                                </div>

                    </div>
                </div>}
        </div>

    )

}
const Notes = (props) => {
    const colors = ["default", "red", "orange", "yellow", "green", "teal", "blue", "darkBlue", "purple", "pink", "brown", "gray"]
    const [state, setState] = React.useState({
        new: { title: "", canvas: [], images: [], list: false, description: "", color: "default", labels: [], pinned: false, archived: false }, showRest: false, pastStates: [{ title: "", set: true, canvas: [], images: [], archived: false, list: false, description: "", color: "default", labels: [], pinned: false }], availableLabels: ["label 1", "Label 2"], current: 0, showDetails: false, addingLabel: false, addingImage: false, addingDrawing: false, labelSearchText: "", notes: [], showNoteDetails: null, addingNoteLabel: null, addingNoteDrawing: null, labelNoteSearchText: "", editingNote: {
            title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
        }, currentHover: null
    })
    const ref = useDetectClickOutside({ onTriggered: () => { notAllowCollapse ? notAllowCollapse = false : setState(state => ({ ...state, showRest: false, showDetails: false })) } });
    const otherRef = useDetectClickOutside({ onTriggered: () => { setState(state => ({ ...state, showDetails: false })) } });
    console.log(state);
    return (
        <div className={theme + "notes"}>

            <Modal open={state.addingDrawing}>
                <Canvas className={theme + "notes-edit-canvas"} setState={setState} state={state} />
            </Modal>

            <Modal open={state.editingNote.set} onClose={() => {

                setState(state => ({
                    ...state, notes: state.notes.map(note => {
                        if (note.id !== state.editingNote.id) {
                            return note;
                        }
                        else {
                            return state.editingNote
                        }
                    }), editingNote: {
                        title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
                    }
                }));
            }} style={{ overflowY: "scroll" }} >
                <div style={{ marginTop: "10rem" }} className={theme + "notes-header " + theme + "notes-color-note-" + state.editingNote.color} >

                    <div className={theme + "notes-header-div"}>
                        <div className={theme + "notes-header-div-pin"}>

                            {state.editingNote.pinned ? <BookmarkIcon
                                onClick={() => {
                                    let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    notAllowCollapse = true;
                                    setState(state => ({ ...state, editingNote: { ...state.editingNote, pinned: false }, pastStates: [...pastStates, { ...state.editingNote, pinned: false }] }))
                                }}
                                className={theme + "notes-header-div-pin-icon"} /> : <BookmarkBorderIcon
                                onClick={() => {
                                    let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    notAllowCollapse = true;
                                    setState(state => ({ ...state, editingNote: { ...state.editingNote, pinned: true }, pastStates: [...pastStates, { ...state.editingNote, pinned: true }] }))
                                }} className={theme + "notes-header-div-pin-icon"} />}
                        </div>
                        {state.editingNote.canvas.length > 0 ? <div className={theme + "notes-header-div-canvas"}>
                            {state.editingNote.canvas.map(canvas => {
                                return <div className={state.editingNote.canvas.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}>< DisabledCanvas length={state.new.canvas.length} data={canvas} />
                                    <div onClick={() => {
                                        const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                        setState(state => ({
                                            ...state, editingNote: {
                                                ...state.editingNote, canvas: state.new.canvas.filter(c => {
                                                    console.log("working")
                                                    if (c !== canvas) {
                                                        return c;
                                                    }

                                                })
                                            }, pastStates: [...pastStates, {
                                                ...state.editingNote, canvas: state.new.canvas.filter(c => {

                                                    if (c !== canvas) {
                                                        return c;
                                                    }

                                                })
                                            }]
                                        }))
                                    }} className={state.editingNote.canvas.length === 1 ? theme + "notes-header-div-canvas-delete" : theme + "notes-header-div-canvas-delete"}>

                                        <DeleteIcon className={theme + "notes-header-div-canvas-delete-icon"} /></div>
                                </div>
                            })}

                        </div> : null}


                        {state.editingNote.images.length > 0 ? <div className={theme + "notes-header-div-canvas"}>
                            {state.editingNote.images.map(canvas => {
                                return <div className={state.editingNote.images.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}><img style={{ width: "100%" }} src={canvas} />
                                    <div onClick={() => {
                                        const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                        setState(state => ({
                                            ...state, editingNote: {
                                                ...state.editingNote, images: state.editingNote.images.filter(c => {

                                                    if (c !== canvas) {
                                                        return c;
                                                    }

                                                })
                                            },
                                            pastStates: [...pastStates, {
                                                ...state.editingNote, images: state.editingNote.images.filter(c => {

                                                    if (c !== canvas) {
                                                        return c;
                                                    }
                                                })
                                            }]
                                        }))
                                    }} className={state.editingNote.canvas.length === 1 ? theme + "notes-header-div-canvas-delete" : theme + "notes-header-div-canvas-delete"}>
                                        <DeleteIcon className={theme + "notes-header-div-canvas-delete-icon"} /></div>
                                </div>
                            })}

                        </div> : null}


                        <input value={state.editingNote.title} placeholder={"Edit Note"} onClick={() => setState(state => ({ ...state, showRest: true }))} className={theme + "notes-header-input"} onChange={(e) => {
                            if (state.current < state.pastStates.length - 1) {
                                let pastStates = state.pastStates.slice(0, state.current);
                                setState(state => ({ ...state, editingNote: { ...state.editingNote, title: e.target.value }, pastStates: [...pastStates, { ...state.editingNote, title: e.target.value }], current: pastStates.length + 1 }));
                            }
                            else {
                                setState(state => ({ ...state, editingNote: { ...state.editingNote, title: e.target.value }, pastStates: [...state.pastStates, { ...state.editingNote, title: e.target.value }], current: state.pastStates.length + 1 }));
                            }

                        }} />
                        <div><textarea value={state.editingNote.description} placeholder="Take a note..." onInput={(e) => {
                            e.target.style.height = "";
                            e.target.style.height = e.target.scrollHeight + "px";

                        }} onChange={(e) => {
                            if (state.current < state.pastStates.length - 1) {
                                let pastStates = state.pastStates.slice(0, state.current);
                                setState(state => ({ ...state, editingNote: { ...state.editingNote, description: e.target.value }, pastStates: [...pastStates, { ...state.editingNote, description: e.target.value }], current: pastStates.length + 1 }));
                            }
                            else {
                                setState(state => ({ ...state, editingNote: { ...state.editingNote, description: e.target.value }, pastStates: [...state.pastStates, { ...state.editingNote, description: e.target.value }], current: state.pastStates.length + 1 }));
                            }
                        }
                        } className={theme + "notes-header-input"} />

                            <div className={theme + "notes-header-labels"}>{state.editingNote.labels.map(label => {
                                return <div className={theme + "notes-header-labels-label"}><p className={theme + "notes-header-labels-label-text"}>{label}</p>
                                    <DeleteIcon onClick={() => {
                                        let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                        notAllowCollapse = true;
                                        setState(state => ({
                                            ...state, editingNote: {
                                                ...state.editingNote, labels: state.editingNote.labels.filter(l => {
                                                    if (l !== label) {
                                                        return l;
                                                    }
                                                })
                                            }, pastStates: [...pastStates, {
                                                ...state.editingNote, labels: state.editingNote.labels.filter(l => {
                                                    if (l !== label) {
                                                        return l;
                                                    }
                                                })
                                            }]
                                        }))
                                    }} className={theme + "notes-header-labels-icon"} />
                                </div>
                            })} </div>

                            <div className={theme + "notes-header-options"}>
                                <div className={theme + "notes-header-options-option-left"}>

                                    <ColorLensOutlinedIcon className={theme + "notes-icon " + theme + "notes-color-icon"} />
                                    <input type="file" id="image-uploader" accept="image/*" onChange={(e) => {
                                        const fileReader = new FileReader();
                                        fileReader.readAsDataURL(e.target.files[0]);
                                        fileReader.onload = () => {

                                            if (state.current < state.pastStates.length - 1) {
                                                let pastStates = state.pastStates.slice(0, state.current);
                                                setState(state => ({ ...state, editingNote: { ...state.editingNote, images: [...state.editingNote.images, fileReader.result] }, pastStates: [...pastStates, { ...state.editingNote, images: [...state.editingNote.images, fileReader.result] }], current: pastStates.length + 1 }));
                                            }
                                            else {
                                                setState(state => ({ ...state, editingNote: { ...state.editingNote, images: [...state.editingNote.images, fileReader.result] }, pastStates: [...state.pastStates, { ...state.editingNote, images: [...state.editingNote.images, fileReader.result] }], current: state.pastStates.length + 1 }));
                                            }
                                        }
                                        console.log(e.target.files)
                                    }} hidden={true} />
                                    <label for="image-uploader"><ImageIcon className={theme + "notes-icon"} /></label>

                                    <div className={theme + "notes-color-palette"}>
                                        {colors.map(c => {
                                            return (

                                                <span className={theme + "notes-color-palette-each"} onClick={() => {
                                                    if (state.current < state.pastStates.length - 1) {
                                                        let pastStates = state.pastStates.slice(0, state.current);
                                                        setState(state => ({ ...state, editingNote: { ...state.editingNote, color: c }, pastStates: [...pastStates, { ...state.editingNote, color: c }], current: state.pastStates.length + 1 }));
                                                    }
                                                    else {
                                                        setState(state => ({ ...state, editingNote: { ...state.editingNote, color: c }, pastStates: [...state.pastStates, { ...state.editingNote, color: c }], current: state.pastStates.length + 1 }));
                                                    }
                                                }}>
                                                    <span className={theme + "notes-color-palette-each-main " + theme + "notes-color-palette-each-" + c} >
                                                        &nbsp;
                                </span>
                                                    <p className={theme + "notes-color-palette-each-toolkit"}> {c}</p>
                                                </span>
                                            )
                                        })}
                                    </div>


                                    {state.editingNote.archived ? <ArchiveIcon
                                        onClick={() => {
                                            let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                            notAllowCollapse = true;
                                            setState(state => ({ ...state, editingNote: { ...state.editingNote, archived: false }, pastStates: [...pastStates, { ...state.editingNote, archived: false }] }))
                                        }} className={theme + "notes-icon"}
                                    /> : <ArchiveOutlinedIcon onClick={() => {
                                        let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                        notAllowCollapse = true;
                                        setState(state => ({ ...state, editingNote: { ...state.editingNote, archived: true }, pastStates: [...pastStates, { ...state.editingNote, archived: true }] }))
                                    }} className={theme + "notes-icon"} />}
                                    <div style={{ display: "inline" }} >
                                        <MoreVertOutlinedIcon className={theme + "notes-icon"} onClick={() => {
                                            if (state.showNoteDetails === state.editingNote.id) {
                                                setState(state => ({ ...state, showNoteDetails: null, addingNoteLabel: false, addingNoteDrawing: false, labelNoteSearchText: "" }));
                                            }
                                            else {
                                                setState(state => ({ ...state, showNoteDetails: state.editingNote.id }));
                                            }

                                        }} />
                                        {state.showNoteDetails === state.editingNote.id ? <div style={{ position: "absolute", bottom: "0", left: "15rem", zIndex: "100" }}>

                                            <div className={theme + "notes-details"}>
                                                {state.addingNoteLabel === state.editingNote.id ?
                                                    <div>
                                                        <h1 className={theme + "notes-details-label-header"} >  Label Note</h1>
                                                        <div key="a" style={{ position: "relative", padding: "1rem" }}>
                                                            <input className={theme + "notes-details-label-input"} onChange={(e) => setState(state => ({ ...state, labelNoteSearchText: e.target.value }))} placeholder="Enter label name" />
                                                            <SearchIcon className={theme + "notes-details-label-input-icon"} />
                                                        </div>
                                                        <div key="b" className={theme + "notes-details-label-labels"}>
                                                            {state.availableLabels.map(label => {
                                                                console.log(label)
                                                                return <div className={theme + "notes-details-label-labels-label"}> <input checked={state.editingNote.labels.includes(label)} onChange={(e) => {
                                                                    if (state.editingNote.labels.includes(label)) {
                                                                        setState(state => ({
                                                                            ...state, editingNote: {
                                                                                ...state.editingNote, labels: [...state.editingNote.labels.filter(l => {
                                                                                    if (l !== label) {
                                                                                        return l;
                                                                                    }
                                                                                })]
                                                                            }
                                                                        }));

                                                                    }
                                                                    else {


                                                                        setState(state => ({
                                                                            ...state, editingNote: { ...state.editingNote, labels: [...state.editingNote.labels, label] }
                                                                        }));
                                                                    }
                                                                }} className={theme + "notes-details-label-labels-label-check"} id={"label-" + label} type="checkbox" /><label htmlFor={"label-" + label} className={theme + "notes-details-label-labels-label-font"}  >{label.length < 10 ? label : label.slice(0, 7) + "..."}</label> </div>
                                                            })}
                                                        </div>
                                                        {state.labelNoteSearchText.length > 0 && !state.availableLabels.includes(state.labelNoteSearchText) ? <div className={theme + "notes-details-label-create"}>
                                                            <AddIcon className={theme + "notes-details-label-create-icon"} />
                                                            <p className={theme + "notes-details-label-create-text"} onClick={() => {
                                                                notAllowCollapse = true;
                                                                setState(state => ({ ...state, availableLabels: [...state.availableLabels, state.labelNoteSearchText] }))
                                                            }}>Create "{state.labelNoteSearchText.length < 10 ? state.labelNoteSearchText : state.labelNoteSearchText.slice(0, 7) + "..."}"</p>
                                                        </div> : null}
                                                    </div>
                                                    :

                                                    <div>
                                                        <div className={theme + "notes-details-list"}>
                                                            <div onClick={() => {

                                                                if (state.addingNoteLabel === state.editingNote.id) {
                                                                    setState(state => ({ ...state, addingNoteLabel: false }))
                                                                }
                                                                else setState(state => ({ ...state, addingNoteLabel: state.editingNote.id }))
                                                            }} className={theme + "notes-details-list-item"}>
                                                                Change Labels
                                                             </div>
                                                            <div onClick={() => { setState(state => ({ ...state, addingLabel: false, addingNoteDrawing: state.editingNote.id, addingDrawing: true })) }} className={theme + "notes-details-list-item"}>
                                                                Add Drawing
                                                            </div>
                                                            <div onClick={() => {
                                                                setState(state => ({
                                                                    ...state, notes: state.notes.filter(n => {
                                                                        if (n.id !== state.editingNote.id) {
                                                                            return n;
                                                                        }
                                                                    }), editingNote: {
                                                                        title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
                                                                    }
                                                                }))
                                                            }} className={theme + "notes-details-list-item"}>
                                                                Delete Note
                                                            </div>
                                                            <div onClick={() => {

                                                                const newNote = { ...state.editingNote, id: uuid() };
                                                                console.log(newNote);
                                                                setState(state => ({
                                                                    ...state, notes: [...state.notes, newNote]
                                                                }))
                                                            }} className={theme + "notes-details-list-item"}>
                                                                Copy Note
                                                            </div>


                                                        </div>
                                                    </div>}
                                            </div>
                                        </div>
                                            : null
                                        }
                                    </div>
                                    <UndoIcon className={theme + "notes-icon"} onClick={() => {
                                        if (state.current > 0) {
                                            if (state.current > 3) {
                                                setState(state => ({ ...state, editingNote: state.pastStates[state.current - 3], current: state.current - 3 }));
                                            }
                                            else {
                                                setState(state => ({ ...state, editingNote: state.pastStates[state.current - 1], current: state.current - 1 }));
                                            }
                                        }
                                    }} />
                                    <RedoIcon className={theme + "notes-icon"}
                                        onClick={() => {
                                            if (state.current < state.pastStates.length - 1) {
                                                if (state.current < state.pastStates.length - 5) {
                                                    console.log(state.current + 3);
                                                    console.log(state.pastStates.length);
                                                    setState(state => ({ ...state, editingNote: state.pastStates[state.current + 3], current: state.current + 3 }));
                                                }
                                                else {
                                                    console.log(state.current + 1);
                                                    console.log(state.pastStates.length);
                                                    setState(state => ({ ...state, editingNote: state.pastStates[state.current + 1], current: state.current + 1 }));
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className={theme + "notes-header-options-right"}>
                                    {state.editingNote.title.length > 0 || state.editingNote.description.length > 0 || state.editingNote.images.length > 0 || state.editingNote.canvas.length > 0 ?
                                        <button className={theme + "notes-header-options-right-close"} onClick={() => {
                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== state.editingNote.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return state.editingNote
                                                    }
                                                }), editingNote: {
                                                    title: "", canvas: [], images: [], set: false, description: "", color: "default", labels: [], pinned: false, archived: false
                                                }
                                            }));
                                        }}> Save </button> : <button className={theme + "notes-header-options-right-close"} onClick={() => {
                                            setState(state => ({ ...state, showRest: false }));
                                        }}> Close</button>}
                                </div>
                            </div></div>
                    </div>
                </div>
            </Modal>

            <div ref={ref} className={theme + "notes-header " + theme + "notes-color-note-" + state.new.color} >

                <div className={theme + "notes-header-div"}>
                    <div className={theme + "notes-header-div-pin"}>

                        {state.showRest ? state.new.pinned ? <BookmarkIcon
                            onClick={() => {
                                let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                notAllowCollapse = true;
                                setState(state => ({ ...state, new: { ...state.new, pinned: false }, pastStates: [...pastStates, { ...state.new, pinned: false }] }))
                            }}
                            className={theme + "notes-header-div-pin-icon"} /> : <BookmarkBorderIcon
                            onClick={() => {
                                let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                notAllowCollapse = true;
                                setState(state => ({ ...state, new: { ...state.new, pinned: true }, pastStates: [...pastStates, { ...state.new, pinned: true }] }))
                            }} className={theme + "notes-header-div-pin-icon"} /> : null}
                    </div>
                    {state.new.canvas.length > 0 ? <div className={theme + "notes-header-div-canvas"}>
                        {state.new.canvas.map(canvas => {
                            return <div className={state.new.canvas.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}>< DisabledCanvas length={state.new.canvas.length} data={canvas} />
                                <div onClick={() => {
                                    const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    setState(state => ({
                                        ...state, new: {
                                            ...state.new, canvas: state.new.canvas.filter(c => {
                                                console.log("working")
                                                if (c !== canvas) {
                                                    return c;
                                                }

                                            })
                                        }, pastStates: [...pastStates, {
                                            ...state.new, canvas: state.new.canvas.filter(c => {
                                                console.log("working")
                                                if (c !== canvas) {
                                                    return c;
                                                }

                                            })
                                        }]
                                    }))
                                }} className={state.new.canvas.length === 1 ? theme + "notes-header-div-canvas-delete" : theme + "notes-header-div-canvas-delete"}>

                                    <DeleteIcon className={theme + "notes-header-div-canvas-delete-icon"} /></div>
                            </div>
                        })}

                    </div> : null}


                    {state.new.images.length > 0 ? <div className={theme + "notes-header-div-canvas"}>
                        {state.new.images.map(canvas => {
                            return <div className={state.new.images.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}><img style={{ width: "100%" }} src={canvas} />
                                <div onClick={() => {
                                    const pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    setState(state => ({
                                        ...state, new: {
                                            ...state.new, images: state.new.images.filter(c => {
                                                console.log("working")
                                                if (c !== canvas) {
                                                    return c;
                                                }

                                            })
                                        },
                                        pastStates: [...pastStates, {
                                            ...state.new, images: state.new.images.filter(c => {
                                                console.log("working")
                                                if (c !== canvas) {
                                                    return c;
                                                }
                                            })
                                        }]
                                    }))
                                }} className={state.new.canvas.length === 1 ? theme + "notes-header-div-canvas-delete" : theme + "notes-header-div-canvas-delete"}>
                                    <DeleteIcon className={theme + "notes-header-div-canvas-delete-icon"} /></div>
                            </div>
                        })}

                    </div> : null}


                    <input value={state.new.title} placeholder={state.showRest ? "Title" : "Take a note..."} onClick={() => setState(state => ({ ...state, showRest: true }))} className={theme + "notes-header-input"} onChange={(e) => {
                        if (state.current < state.pastStates.length - 1) {
                            let pastStates = state.pastStates.slice(0, state.current);
                            setState(state => ({ ...state, new: { ...state.new, title: e.target.value }, pastStates: [...pastStates, { ...state.new, title: e.target.value }], current: pastStates.length + 1 }));
                        }
                        else {
                            setState(state => ({ ...state, new: { ...state.new, title: e.target.value }, pastStates: [...state.pastStates, { ...state.new, title: e.target.value }], current: state.pastStates.length + 1 }));
                        }

                    }} />
                    {state.showRest ? <div><textarea value={state.new.description} placeholder="Take a note..." onInput={(e) => {
                        e.target.style.height = "";
                        e.target.style.height = e.target.scrollHeight + "px";

                    }} onChange={(e) => {
                        if (state.current < state.pastStates.length - 1) {
                            let pastStates = state.pastStates.slice(0, state.current);
                            setState(state => ({ ...state, new: { ...state.new, description: e.target.value }, pastStates: [...pastStates, { ...state.new, description: e.target.value }], current: pastStates.length + 1 }));
                        }
                        else {
                            setState(state => ({ ...state, new: { ...state.new, description: e.target.value }, pastStates: [...state.pastStates, { ...state.new, description: e.target.value }], current: state.pastStates.length + 1 }));
                        }
                    }
                    } className={theme + "notes-header-input"} />

                        <div className={theme + "notes-header-labels"}>{state.new.labels.map(label => {
                            return <div className={theme + "notes-header-labels-label"}><p className={theme + "notes-header-labels-label-text"}>{label}</p>
                                <DeleteIcon onClick={() => {
                                    let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    notAllowCollapse = true;
                                    setState(state => ({
                                        ...state, new: {
                                            ...state.new, labels: state.new.labels.filter(l => {
                                                if (l !== label) {
                                                    return l;
                                                }
                                            })
                                        }, pastStates: [...pastStates, {
                                            ...state.new, labels: state.new.labels.filter(l => {
                                                if (l !== label) {
                                                    return l;
                                                }
                                            })
                                        }]
                                    }))
                                }} className={theme + "notes-header-labels-icon"} />
                            </div>
                        })} </div>

                        <div className={theme + "notes-header-options"}>
                            <div className={theme + "notes-header-options-option-left"}>

                                <ColorLensOutlinedIcon className={theme + "notes-icon " + theme + "notes-color-icon"} />
                                <input type="file" id="image-uploader" accept="image/*" onChange={(e) => {
                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(e.target.files[0]);
                                    fileReader.onload = () => {

                                        if (state.current < state.pastStates.length - 1) {
                                            let pastStates = state.pastStates.slice(0, state.current);
                                            setState(state => ({ ...state, new: { ...state.new, images: [...state.new.images, fileReader.result] }, pastStates: [...pastStates, { ...state.new, images: [...state.new.images, fileReader.result] }], current: pastStates.length + 1 }));
                                        }
                                        else {
                                            setState(state => ({ ...state, new: { ...state.new, images: [...state.new.images, fileReader.result] }, pastStates: [...state.pastStates, { ...state.new, images: [...state.new.images, fileReader.result] }], current: state.pastStates.length + 1 }));
                                        }

                                    }
                                    console.log(e.target.files)
                                }} hidden={true} />
                                <label for="image-uploader"><ImageIcon className={theme + "notes-icon"} /></label>

                                <div className={theme + "notes-color-palette"}>
                                    {colors.map(c => {
                                        return (

                                            <span className={theme + "notes-color-palette-each"} onClick={() => {
                                                if (state.current < state.pastStates.length - 1) {
                                                    let pastStates = state.pastStates.slice(0, state.current);
                                                    setState(state => ({ ...state, new: { ...state.new, color: c }, pastStates: [...pastStates, { ...state.new, color: c }], current: state.pastStates.length + 1 }));
                                                }
                                                else {
                                                    setState(state => ({ ...state, new: { ...state.new, color: c }, pastStates: [...state.pastStates, { ...state.new, color: c }], current: state.pastStates.length + 1 }));
                                                }
                                            }}>
                                                <span className={theme + "notes-color-palette-each-main " + theme + "notes-color-palette-each-" + c} >
                                                    &nbsp;
                                                </span>
                                                <p className={theme + "notes-color-palette-each-toolkit"}> {c}</p>
                                            </span>
                                        )
                                    })}
                                </div>


                                {state.new.archived ? <ArchiveIcon
                                    onClick={() => {
                                        let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                        notAllowCollapse = true;
                                        setState(state => ({ ...state, new: { ...state.new, archived: false }, pastStates: [...pastStates, { ...state.new, archived: false }] }))
                                    }} className={theme + "notes-icon"}
                                /> : <ArchiveOutlinedIcon onClick={() => {
                                    let pastStates = state.current < state.pastStates.length - 1 ? state.pastStates.slice(0, state.current) : state.pastStates;
                                    notAllowCollapse = true;
                                    setState(state => ({ ...state, new: { ...state.new, archived: true }, pastStates: [...pastStates, { ...state.new, archived: true }] }))
                                }} className={theme + "notes-icon"} />}
                                <div style={{ display: "inline" }} >
                                    <MoreVertOutlinedIcon className={theme + "notes-icon"} onClick={() => {
                                        setState(state => ({ ...state, showDetails: !state.showDetails, addingLabel: false, addingDrawing: false, addingImage: false }));
                                    }} />
                                    {state.showDetails ? <AnotherComponent state={state} setState={setState} />


                                        : null
                                    }

                                </div>
                                <UndoIcon className={theme + "notes-icon"} onClick={() => {
                                    if (state.current > 0) {
                                        if (state.current > 3) {
                                            setState(state => ({ ...state, new: state.pastStates[state.current - 3], current: state.current - 3 }));
                                        }
                                        else {
                                            setState(state => ({ ...state, new: state.pastStates[state.current - 1], current: state.current - 1 }));
                                        }
                                    }
                                }} />
                                <RedoIcon className={theme + "notes-icon"}
                                    onClick={() => {
                                        if (state.current < state.pastStates.length - 1) {
                                            if (state.current < state.pastStates.length - 5) {
                                                console.log(state.current + 3);
                                                console.log(state.pastStates.length);
                                                setState(state => ({ ...state, new: state.pastStates[state.current + 3], current: state.current + 3 }));
                                            }
                                            else {
                                                console.log(state.current + 1);
                                                console.log(state.pastStates.length);
                                                setState(state => ({ ...state, new: state.pastStates[state.current + 1], current: state.current + 1 }));
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className={theme + "notes-header-options-right"}>
                                {state.new.title.length > 0 || state.new.description.length > 0 || state.new.images.length > 0 || state.new.canvas.length > 0 ?
                                    <button className={theme + "notes-header-options-right-close"} onClick={() => {
                                        setState(state => ({ ...state, new: { title: "", canvas: [], images: [], list: false, description: "", color: "default", labels: [], pinned: false, archived: false }, showRest: false, pastStates: [{ title: "", canvas: [], images: [], archived: false, list: false, description: "", color: "default", labels: [], pinned: false }], notes: [...state.notes, { ...state.new, id: uuid() }], current: 0 }));
                                    }}> Save </button> : <button className={theme + "notes-header-options-right-close"} onClick={() => {
                                        setState(state => ({ ...state, showRest: false }));
                                    }}> Close</button>}
                            </div>
                        </div></div> : null}
                </div>
            </div>
            <div className={theme + "notes-pinned"}>
                <h1 className={theme + "notes-pinned-header"}>
                    PINNED
                </h1>
                <div className={theme + "notes-notes"}>
                    {state.notes.map(a => {
                        if (a.pinned && !a.archived) {
                            return (<div key={a.id}

                                onMouseEnter={() => {
                                    setState(state => ({ ...state, currentHover: a.id }))
                                }} onMouseLeave={() => { setState(state => ({ ...state, currentHover: null })) }} className={theme + "notes-notes-note-" + a.color + " " + theme + "notes-notes-note"} style={{ position: "relative" }}>
                                {a.pinned ?
                                    <BookmarkIcon
                                        style={{ display: state.currentHover !== a.id ? "none" : "block" }}

                                        onClick={() => {

                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return { ...a, pinned: false }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-notes-note-bookmark"} />
                                    : <BookmarkBorderIcon

                                        onClick={() => {

                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return { ...a, pinned: true }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-notes-note-bookmark"} />

                                }
                                {a.canvas.length > 0 ? <div className={theme + "notes-notes-note-canvas"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.canvas.map(canvas => {
                                        return <div className={a.canvas.length === 1 ? theme + "notes-notes-note-canvas-single" : theme + "notes-notes-note-canvas-multiple"} >< DisabledCanvas type="in-note" length={a.canvas.length} data={canvas} />
                                            {/* <br/> */}
                                        </div>
                                    })}

                                </div> : null}


                                {a.images.length > 0 ? <div onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }} className={theme + "notes-notes-note-canvas"}>
                                    {a.images.map(canvas => {
                                        return <div className={a.images.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}><img style={{ width: "100%" }} src={canvas} />

                                        </div>
                                    })}

                                </div> : null}
                                <div className={theme + "notes-notes-note-title"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.title}
                                </div>
                                <div className={theme + "notes-notes-note-description"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.description.length > 3000 ? a.description.slice(0, 2998) + "..." : a.description}
                                </div>
                                {a.labels.length > 0 ? <div className={theme + "notes-header-labels"}>{a.labels.map(label => {
                                    return <div className={theme + "notes-header-labels-label"}><p className={theme + "notes-header-labels-label-text"}>{label}</p>
                                        <DeleteIcon onClick={() => {

                                            setState(state => ({
                                                ...state,
                                                notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return {
                                                            ...note, labels: a.labels.filter(l => {
                                                                if (l !== label) {
                                                                    return l
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-header-labels-icon"} />
                                    </div>
                                })} </div> : <br />}
                                <div className={theme + "notes-header-options"} style={{ opacity: state.currentHover !== a.id ? 0 : 1, transition: "0.35s all", marginTop: "-1.7rem", marginBottom: "-1rem" }}>
                                    <div className={theme + "notes-header-options-option-left"}>

                                        <ColorLensOutlinedIcon className={theme + "notes-icon " + theme + "notes-color-icon"} />
                                        <input type="file" id={"image-uploader-" + a.id} accept="image/*" onChange={(e) => {
                                            const fileReader = new FileReader();
                                            try {
                                                fileReader.readAsDataURL(e.target.files[0]);
                                                fileReader.onload = () => {

                                                    setState(state => ({
                                                        ...state, notes: state.notes.map(note => {
                                                            console.log(note);
                                                            console.log(a);
                                                            if (note.id !== a.id) {

                                                                return note;

                                                            }
                                                            else {
                                                                console.log("match: " + note.title + " " + a.title);
                                                                return { ...note, images: [...note.images, fileReader.result] };
                                                            }
                                                        })
                                                    }))
                                                }
                                            } catch (err) {
                                                console.log(err.message);
                                            }

                                            console.log(e.target.files)
                                        }} hidden={true} />
                                        <label for={"image-uploader-" + a.id}><ImageIcon className={theme + "notes-icon"} /></label>

                                        <div className={theme + "notes-color-palette"}>
                                            {colors.map(c => {
                                                return (

                                                    <span className={theme + "notes-color-palette-each"} onClick={() => {
                                                        setState(state => ({
                                                            ...state, notes: state.notes.map(note => {
                                                                if (note.id !== a.id) {
                                                                    return note
                                                                }
                                                                else {
                                                                    return ({ ...note, color: c })
                                                                }
                                                            })
                                                        }))
                                                    }}>
                                                        <span className={theme + "notes-color-palette-each-main " + theme + "notes-color-palette-each-" + c} >
                                                            &nbsp;
                                            </span>
                                                        <p className={theme + "notes-color-palette-each-toolkit"}> {c}</p>
                                                    </span>
                                                )
                                            })}
                                        </div>


                                        {a.archived ? <ArchiveIcon
                                            onClick={() => {
                                                setState(state => ({
                                                    ...state, notes: state.notes.map(note => {
                                                        if (note.id !== a.id) {
                                                            return note
                                                        }
                                                        else {
                                                            return ({ ...note, archived: false });
                                                        }
                                                    })
                                                }))

                                            }} className={theme + "notes-icon"}
                                        /> : <ArchiveOutlinedIcon onClick={() => {
                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note
                                                    }
                                                    else {
                                                        return ({ ...note, archived: true });
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-icon"} />}
                                        <div style={{ display: "inline" }} >
                                            <MoreVertOutlinedIcon className={theme + "notes-icon"} onClick={() => {
                                                if (state.showNoteDetails === a.id) {
                                                    setState(state => ({ ...state, showNoteDetails: null, addingNoteLabel: false, addingNoteDrawing: false, labelNoteSearchText: "" }));
                                                }
                                                else {
                                                    setState(state => ({ ...state, showNoteDetails: a.id }));
                                                }

                                            }} />
                                            {state.showNoteDetails === a.id ? <div style={{ position: "absolute", bottom: "0", right: "5rem", zIndex: "100" }}>

                                                <div className={theme + "notes-details"}>
                                                    {state.addingNoteLabel === a.id ?
                                                        <div>
                                                            <h1 className={theme + "notes-details-label-header"} >  Label Note</h1>
                                                            <div key="a" style={{ position: "relative", padding: "1rem" }}>
                                                                <input className={theme + "notes-details-label-input"} onChange={(e) => setState(state => ({ ...state, labelNoteSearchText: e.target.value }))} placeholder="Enter label name" />
                                                                <SearchIcon className={theme + "notes-details-label-input-icon"} />
                                                            </div>
                                                            <div key="b" className={theme + "notes-details-label-labels"}>
                                                                {state.availableLabels.map(label => {
                                                                    console.log(label)
                                                                    return <div className={theme + "notes-details-label-labels-label"}> <input checked={a.labels.includes(label)} onChange={(e) => {
                                                                        if (a.labels.includes(label)) {
                                                                            setState(state => ({
                                                                                ...state, notes: state.notes.map(note => {
                                                                                    if (note.id !== a.id) {
                                                                                        return note;
                                                                                    }
                                                                                    else {
                                                                                        let labels = note.labels.filter(l => {
                                                                                            if (l !== label) {
                                                                                                return l;
                                                                                            }
                                                                                        });
                                                                                        return { ...note, labels };
                                                                                    }
                                                                                })
                                                                            }));
                                                                        }
                                                                        else {
                                                                            setState(state => ({
                                                                                ...state, notes: state.notes.map(note => {
                                                                                    if (note.id !== a.id) {
                                                                                        return note;
                                                                                    }
                                                                                    else {
                                                                                        return { ...note, labels: [...note.labels, label] };
                                                                                    }
                                                                                })
                                                                            }));
                                                                        }
                                                                    }} className={theme + "notes-details-label-labels-label-check"} id={"label-" + label} type="checkbox" /><label htmlFor={"label-" + label} className={theme + "notes-details-label-labels-label-font"}  >{label.length < 10 ? label : label.slice(0, 7) + "..."}</label> </div>
                                                                })}
                                                            </div>
                                                            {state.labelNoteSearchText.length > 0 && !state.availableLabels.includes(state.labelNoteSearchText) ? <div className={theme + "notes-details-label-create"}>
                                                                <AddIcon className={theme + "notes-details-label-create-icon"} />
                                                                <p className={theme + "notes-details-label-create-text"} onClick={() => {
                                                                    notAllowCollapse = true;
                                                                    setState(state => ({ ...state, availableLabels: [...state.availableLabels, state.labelNoteSearchText] }))
                                                                }}>Create "{state.labelNoteSearchText.length < 10 ? state.labelNoteSearchText : state.labelNoteSearchText.slice(0, 7) + "..."}"</p>
                                                            </div> : null}
                                                        </div>
                                                        :

                                                        <div>
                                                            <div className={theme + "notes-details-list"}>
                                                                <div onClick={() => {

                                                                    if (state.addingNoteLabel === a.id) {
                                                                        setState(state => ({ ...state, addingNoteLabel: false }))
                                                                    }
                                                                    else setState(state => ({ ...state, addingNoteLabel: a.id }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Change Labels
                                                             </div>
                                                                <div onClick={() => { setState(state => ({ ...state, addingLabel: false, addingNoteDrawing: a.id, addingDrawing: true })) }} className={theme + "notes-details-list-item"}>
                                                                    Add Drawing
                                                            </div>
                                                                <div onClick={() => {
                                                                    setState(state => ({
                                                                        ...state, notes: state.notes.filter(n => {
                                                                            if (n.id !== a.id) {
                                                                                return n;
                                                                            }
                                                                        })
                                                                    }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Delete Note
                                                            </div>
                                                                <div onClick={() => {
                                                                    const newId = uuid();
                                                                    console.log(a.id + " " + newId);
                                                                    const newNote = { ...a, id: newId };
                                                                    console.log(newNote);
                                                                    setState(state => ({
                                                                        ...state, notes: [...state.notes, newNote]
                                                                    }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Copy Note
                                                            </div>


                                                            </div>
                                                        </div>}
                                                </div>
                                            </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    })}
                </div>
            </div>

            <div className={theme + "notes-others"}>
                <h1 className={theme + "notes-others-header"}>
                    OTHERS
                </h1>
                <div className={theme + "notes-notes"}>
                    {state.notes.map(a => {
                        if (!a.pinned && !a.archived) {
                            return (<div key={a.id}

                                onMouseEnter={() => {
                                    setState(state => ({ ...state, currentHover: a.id }))
                                }} onMouseLeave={() => { setState(state => ({ ...state, currentHover: null })) }} className={theme + "notes-notes-note-" + a.color + " " + theme + "notes-notes-note"} style={{ position: "relative" }}>
                                {a.pinned ?
                                    <BookmarkIcon
                                        style={{ display: state.currentHover !== a.id ? "none" : "block" }}



                                        onClick={() => {

                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return { ...a, pinned: false }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-notes-note-bookmark"} />
                                    : <BookmarkBorderIcon
                                        style={{ display: state.currentHover !== a.id ? "none" : "block" }}
                                        onClick={() => {

                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return { ...a, pinned: true }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-notes-note-bookmark"} />

                                }
                                {a.canvas.length > 0 ? <div className={theme + "notes-notes-note-canvas"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.canvas.map(canvas => {
                                        return <div className={a.canvas.length === 1 ? theme + "notes-notes-note-canvas-single" : theme + "notes-notes-note-canvas-multiple"}>< DisabledCanvas type="in-note" length={a.canvas.length} data={canvas} />
                                            {/* <br/> */}
                                        </div>
                                    })}

                                </div> : null}


                                {a.images.length > 0 ? <div className={theme + "notes-notes-note-canvas"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.images.map(canvas => {
                                        return <div className={a.images.length === 1 ? theme + "notes-header-div-canvas-single" : theme + "notes-header-div-canvas-multiple"}><img style={{ width: "100%" }} src={canvas} />

                                        </div>
                                    })}

                                </div> : null}
                                <div className={theme + "notes-notes-note-title"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.title}
                                </div>
                                <div className={theme + "notes-notes-note-description"} onClick={() => {
                                    setState(state => ({ ...state, editingNote: { ...a, set: true } }))
                                }}>
                                    {a.description.length > 3000 ? a.description.slice(0, 2998) + "..." : a.description}
                                </div>
                                {a.labels.length > 0 ? <div className={theme + "notes-header-labels"}>{a.labels.map(label => {
                                    return <div className={theme + "notes-header-labels-label"}><p className={theme + "notes-header-labels-label-text"}>{label}</p>
                                        <DeleteIcon onClick={() => {

                                            setState(state => ({
                                                ...state,
                                                notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note;
                                                    }
                                                    else {
                                                        return {
                                                            ...note, labels: a.labels.filter(l => {
                                                                if (l !== label) {
                                                                    return l
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-header-labels-icon"} />
                                    </div>
                                })} </div> : <br />}
                                <div className={theme + "notes-header-options"} style={{ opacity: state.currentHover !== a.id ? 0 : 1, transition: "0.35s all", marginTop: "-1.7rem", marginBottom: "-1rem" }}>
                                    <div className={theme + "notes-header-options-option-left"}>

                                        <ColorLensOutlinedIcon className={theme + "notes-icon " + theme + "notes-color-icon"} />
                                        <input type="file" id={"image-uploader-" + a.id} accept="image/*" onChange={(e) => {
                                            const fileReader = new FileReader();
                                            try {
                                                fileReader.readAsDataURL(e.target.files[0]);
                                                fileReader.onload = () => {

                                                    setState(state => ({
                                                        ...state, notes: state.notes.map(note => {
                                                            console.log(note);
                                                            console.log(a);
                                                            if (note.id !== a.id) {

                                                                return note;

                                                            }
                                                            else {
                                                                console.log("match: " + note.title + " " + a.title);
                                                                return { ...note, images: [...note.images, fileReader.result] };
                                                            }
                                                        })
                                                    }))
                                                }
                                            } catch (err) {
                                                console.log(err.message);
                                            }

                                            console.log(e.target.files)
                                        }} hidden={true} />
                                        <label for={"image-uploader-" + a.id}><ImageIcon className={theme + "notes-icon"} /></label>

                                        <div className={theme + "notes-color-palette"}>
                                            {colors.map(c => {
                                                return (

                                                    <span className={theme + "notes-color-palette-each"} onClick={() => {
                                                        setState(state => ({
                                                            ...state, notes: state.notes.map(note => {
                                                                if (note.id !== a.id) {
                                                                    return note
                                                                }
                                                                else {
                                                                    return ({ ...note, color: c })
                                                                }
                                                            })
                                                        }))
                                                    }}>
                                                        <span className={theme + "notes-color-palette-each-main " + theme + "notes-color-palette-each-" + c} >
                                                            &nbsp;
                                            </span>
                                                        <p className={theme + "notes-color-palette-each-toolkit"}> {c}</p>
                                                    </span>
                                                )
                                            })}
                                        </div>


                                        {a.archived ? <ArchiveIcon
                                            onClick={() => {
                                                setState(state => ({
                                                    ...state, notes: state.notes.map(note => {
                                                        if (note.id !== a.id) {
                                                            return note
                                                        }
                                                        else {
                                                            return ({ ...note, archived: false });
                                                        }
                                                    })
                                                }))

                                            }} className={theme + "notes-icon"}
                                        /> : <ArchiveOutlinedIcon onClick={() => {
                                            setState(state => ({
                                                ...state, notes: state.notes.map(note => {
                                                    if (note.id !== a.id) {
                                                        return note
                                                    }
                                                    else {
                                                        return ({ ...note, archived: true });
                                                    }
                                                })
                                            }))
                                        }} className={theme + "notes-icon"} />}
                                        <div style={{ display: "inline" }} >
                                            <MoreVertOutlinedIcon className={theme + "notes-icon"} onClick={() => {
                                                if (state.showNoteDetails === a.id) {
                                                    setState(state => ({ ...state, showNoteDetails: null, addingNoteLabel: false, addingNoteDrawing: false, labelNoteSearchText: "" }));
                                                }
                                                else {
                                                    setState(state => ({ ...state, showNoteDetails: a.id }));
                                                }

                                            }} />
                                            {state.showNoteDetails === a.id ? <div style={{ position: "absolute", bottom: "0", right: "5rem", zIndex: "100" }}>

                                                <div className={theme + "notes-details"}>
                                                    {state.addingNoteLabel === a.id ?
                                                        <div>
                                                            <h1 className={theme + "notes-details-label-header"} >  Label Note</h1>
                                                            <div key="a" style={{ position: "relative", padding: "1rem" }}>
                                                                <input className={theme + "notes-details-label-input"} onChange={(e) => setState(state => ({ ...state, labelNoteSearchText: e.target.value }))} placeholder="Enter label name" />
                                                                <SearchIcon className={theme + "notes-details-label-input-icon"} />
                                                            </div>
                                                            <div key="b" className={theme + "notes-details-label-labels"}>
                                                                {state.availableLabels.map(label => {
                                                                    console.log(label)
                                                                    return <div className={theme + "notes-details-label-labels-label"}> <input checked={a.labels.includes(label)} onChange={(e) => {
                                                                        if (a.labels.includes(label)) {
                                                                            setState(state => ({
                                                                                ...state, notes: state.notes.map(note => {
                                                                                    if (note.id !== a.id) {
                                                                                        return note;
                                                                                    }
                                                                                    else {
                                                                                        let labels = note.labels.filter(l => {
                                                                                            if (l !== label) {
                                                                                                return l;
                                                                                            }
                                                                                        });
                                                                                        return { ...note, labels };
                                                                                    }
                                                                                })
                                                                            }));
                                                                        }
                                                                        else {


                                                                            setState(state => ({
                                                                                ...state, notes: state.notes.map(note => {
                                                                                    if (note.id !== a.id) {
                                                                                        return note;
                                                                                    }
                                                                                    else {
                                                                                        return { ...note, labels: [...note.labels, label] };
                                                                                    }
                                                                                })
                                                                            }));
                                                                        }
                                                                    }} className={theme + "notes-details-label-labels-label-check"} id={"label-" + label} type="checkbox" /><label htmlFor={"label-" + label} className={theme + "notes-details-label-labels-label-font"}  >{label.length < 10 ? label : label.slice(0, 7) + "..."}</label> </div>
                                                                })}
                                                            </div>
                                                            {state.labelNoteSearchText.length > 0 && !state.availableLabels.includes(state.labelNoteSearchText) ? <div className={theme + "notes-details-label-create"}>
                                                                <AddIcon className={theme + "notes-details-label-create-icon"} />
                                                                <p className={theme + "notes-details-label-create-text"} onClick={() => {
                                                                    notAllowCollapse = true;
                                                                    setState(state => ({ ...state, availableLabels: [...state.availableLabels, state.labelNoteSearchText] }))
                                                                }}>Create "{state.labelNoteSearchText.length < 10 ? state.labelNoteSearchText : state.labelNoteSearchText.slice(0, 7) + "..."}"</p>
                                                            </div> : null}
                                                        </div>
                                                        :

                                                        <div>
                                                            <div className={theme + "notes-details-list"}>
                                                                <div onClick={() => {

                                                                    if (state.addingNoteLabel === a.id) {
                                                                        setState(state => ({ ...state, addingNoteLabel: false }))
                                                                    }
                                                                    else setState(state => ({ ...state, addingNoteLabel: a.id }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Change Labels
                                                             </div>
                                                                <div onClick={() => { setState(state => ({ ...state, addingLabel: false, addingNoteDrawing: a.id, addingDrawing: true })) }} className={theme + "notes-details-list-item"}>
                                                                    Add Drawing
                                                            </div>
                                                                <div onClick={() => {
                                                                    setState(state => ({
                                                                        ...state, notes: state.notes.filter(n => {
                                                                            if (n.id !== a.id) {
                                                                                return n;
                                                                            }
                                                                        })
                                                                    }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Delete Note
                                                            </div>
                                                                <div onClick={() => {
                                                                    const newId = uuid();
                                                                    console.log(a.id + " " + newId);
                                                                    const newNote = { ...a, id: newId };
                                                                    console.log(newNote);
                                                                    setState(state => ({
                                                                        ...state, notes: [...state.notes, newNote]
                                                                    }))
                                                                }} className={theme + "notes-details-list-item"}>
                                                                    Copy Note
                                                            </div>


                                                            </div>
                                                        </div>}
                                                </div>
                                            </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    })}
                </div>
            </div>
        </div >
    )
}
export default Notes;