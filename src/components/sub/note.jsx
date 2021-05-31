import React from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import { useDetectClickOutside } from 'react-detect-click-outside';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { v4 as uuid } from 'uuid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Canvas, { DisabledCanvas } from './canvas';
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
const colors = ["default", "red", "orange", "yellow", "green", "teal", "blue", "darkBlue", "purple", "pink", "brown", "gray"]
const Component = (props) => {
    const a = props.a;
    let state = props.state;
    let setState = props.setState;
    let theme = props.theme;
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
        {a.labels.length > 0 ? <div className={theme + "notes-header-labels"} style={{marginBottom:"2rem"}}>{a.labels.map(label => {
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

export default Component;