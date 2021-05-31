import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import Modal from '@material-ui/core/Modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditIcon from '@material-ui/icons/Edit';

export const Labels = (props) => {

    const number = props.themeNumber;
    const theme = number === 1 ? "dark-" : "light-";

    return (
        <div component style={{ transition: "all 0.5s" }} className={theme + "label"} onMouseEnter={() => {
            console.log(props.state.L);
            if (!props.state.L.forceSituation) {
                props.setState(state => ({ ...state, L: { ...state.L, situation: "" } }))
            }
        }} onMouseLeave={() => {
            console.log(props.state.L);
            if (!props.state.L.forceSituation) {
                props.setState(state => ({ ...state, L: { ...state.L, situation: "mini-" } }))
            }
        }}>
            <Modal style={{ transition: "all 0.5s" }} open={props.state.L.showModal} onClose={() => { props.setState(state => ({ ...state, L: { ...state.L, showModal: !props.state.L.showModal } })) }}>
                <div className={theme + "label-" + props.state.L.situation + "modal"}>
                    <div className={theme + "label-" + props.state.L.situation + "modal-container"}>
                        <h1 className={theme + "label-" + props.state.L.situation + "modal-title"}>Edit labels</h1>
                        <form className={theme + "label-" + props.state.L.situation + "modal-form"} onSubmit={(e) => {
                            e.preventDefault();
                            if (!props.state.availableLabels.includes(props.state.L.new) && props.state.L.new !== "Notes") {
                                if (props.state.L.new.length > 0) {
                                    props.setState(state => ({ ...state, L: { ...state.L, new: "" }, availableLabels: [...props.state.availableLabels, props.state.L.new] }));
                                }
                            }

                        }}>
                            {props.state.L.edit ? <CloseOutlinedIcon onClick={() => props.setState(state => ({ ...state, L: { ...state.L, edit: false } }))} className={theme + "label-" + props.state.L.situation + "modal-form-icon"} /> : <AddOutlinedIcon onClick={() => props.setState(state => ({ ...state, L: { ...state.L, edit: true } }))} className={theme + "label-" + props.state.L.situation + "modal-form-icon"} />}
                            <input value={props.state.L.new} placeholder="Create a label" onChange={(e) => props.setState(state => ({ ...state, L: { ...state.L, new: e.target.value } }))} onFocus={() => props.setState(state => ({ ...state, L: { ...state.L, edit: true } }))} className={theme + "label-" + props.state.L.situation + "modal-form-input"} />
                            {props.state.L.edit ? <CheckOutlinedIcon className={theme + "label-" + props.state.L.situation + "modal-form-icon"} onClick={() => {
                                if (props.state.L.new.length > 0) {
                                    props.setState(state => ({ ...state, L: { ...state.L, new: "" }, availableLabels: [...props.state.availableLabels, props.state.L.new] }));
                                }
                            }} /> : <div>&nbsp;</div>}
                        </form>
                        <div className={theme + "label-" + props.state.L.situation + "modal-labels"}>
                            {props.state.availableLabels.map(i => {
                                console.log(i);
                                if (i === null) {
                                    return null;
                                }
                                return (<div key={i} onMouseEnter={() => {
                                    props.setState(state => ({ ...state, L: { ...state.L, modalCurrent: i } }));
                                }} onMouseLeave={() => {
                                    props.setState(state => ({ ...state, L: { ...state.L, modalCurrent: null } }));
                                }}
                                    className={theme + "label-" + props.state.L.situation + "list-item "} >

                                    {props.state.L.modalCurrent === i ? <DeleteIcon onClick={() => props.setState(state => ({
                                        ...props.state,
                                        availableLabels: props.state.availableLabels.filter(l => {
                                            if (l !== i) {
                                                return l;
                                            }
                                        })

                                    }))} className={theme + "label-" + props.state.L.situation + "modal-labels-icon-left"} /> : <LabelIcon className={theme + "label-" + props.state.L.situation + "modal-labels-icon-left"} />}

                                    {props.state.L.editModal === i ? <form onSubmit={(e) => {
                                        e.preventDefault();
                                        props.setState(state => ({ ...state, L: { ...state.L, editModal: -1 } }));
                                    }}> <input autoFocus={true} className={theme + "label-" + props.state.L.situation + "modal-labels-input"} value={props.state.availableLabels.find(label => label === i)} onChange={(e) => props.setState(state => ({
                                        ...state,
                                        availableLabels: state.availableLabels.map(label => {
                                            if (label === i) {
                                                return e.target.value;
                                            }
                                            else {
                                                return label;
                                            }
                                        }), L:{...state.L, editModal: e.target.value}

                                    }))} /> </form> : <div><p onClick={() => { props.setState(state => ({ ...state, L: { ...state.L, editModal: i } })); }} className={theme + "label-" + props.state.L.situation + "list-item-name"}>{i.length > 17 ? i.slice(0, 13) + "..." : i}</p></div>}


                                    {props.state.L.editModal === i ? <CheckOutlinedIcon className={theme + "label-" + props.state.L.situation + "modal-labels-icon-edit"} style={{ marginTop: "-2rem" }} onClick={() => {
                                        props.setState(state => ({ ...state, L: { ...state.L, editModal: -1 } }));
                                    }} /> : <EditIcon className={theme + "label-" + props.state.L.situation + "modal-labels-icon-edit"} onClick={() => {
                                        props.setState(state => ({ ...state, L: { ...state.L, editModal: i } }));
                                    }} />}
                                </div>)

                            })}
                        </div>
                    </div>
                    <div className={theme + "label-" + props.state.L.situation + "modal-close "}>
                        <button className={theme + "label-" + props.state.L.situation + "modal-close-button "} onClick={() => props.setState(state => ({ ...state, L: { ...state.L, showModal: false } }))}>Done</button>
                    </div>
                </div>
            </Modal>
            <MenuIcon className={theme + "label-" + props.state.L.situation + "icon"} onClick={() => {
                if (!props.state.L.forceSituation) {
                    props.setState(state => ({ ...state, L: { ...state.L, situation: "", forceSituation: true } }))
                }
                else {
                    props.setState(state => ({ ...state, L: { ...state.L, situation: "mini-", forceSituation: false } }))
                }
            }} />
            <div style={{ transition: "all 0.2s" }} className={theme + "label-" + props.state.L.situation + "list"}>
                {props.state.L.list.map(i => {
                    let key = i.name;
                    return (<div key={key} onClick={() => {
                        if (key === "Edit labels") {
                            props.setState(state => ({ ...state, L: { ...state.L,  showModal: true } }));
                        }
                        else {
                            if (key === "Archived") {
                                props.setState(state => ({ ...state, L: { ...state.L, current: key }, filter: { ...state.filter, archived: true } }));
                            }
                            else {
                                props.setState(state => ({ ...state, L: { ...state.L, current: key }, filter: { ...state.filter, archived: false } }));
                            }

                        }
                    }} className={props.state.L.current === key ? theme + "label-" + props.state.L.situation + "list-item " + theme + "label-" + props.state.L.situation + "list-item-current" : theme + "label-" + props.state.L.situation + "list-item"}>{i.name === "Notes" ? <EmojiObjectsIcon className={theme + "label-" + props.state.L.situation + "list-item-icon"} /> : i.name === "Archived" ? <ArchiveIcon className={theme + "label-" + props.state.L.situation + "list-item-icon"} /> : <EditIcon className={theme + "label-" + props.state.L.situation + "list-item-icon"} />}<p className={theme + "label-" + props.state.L.situation + "list-item-name"}>{i.name}</p></div>)
                })}
                {props.state.availableLabels.map(i => {

                    return (<div key={i} onClick={() => {

                        props.setState(state => ({ ...state, L: { ...state.L, current: i }, filter: { ...state.filter, archived: false } }));


                    }} className={props.state.L.current === i ? theme + "label-" + props.state.L.situation + "list-item " + theme + "label-" + props.state.L.situation + "list-item-current" : theme + "label-" + props.state.L.situation + "list-item"}><LabelOutlinedIcon className={theme + "label-" + props.state.L.situation + "list-item-icon"} /> <p className={theme + "label-" + props.state.L.situation + "list-item-name"}>{i.length > 17 ? i.slice(0, 13) + "..." : i}</p></div>)
                })}
            </div>
        </div >);
}
export default Labels;