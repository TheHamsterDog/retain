import { StarRateTwoTone } from '@material-ui/icons';
import React from 'react';
import CanvasDraw from "react-canvas-draw";
import { HexColorPicker } from "react-colorful";


const Canvas = (props) => {
    const ref = React.useRef(null);
    const [state, setState] = React.useState({ color: "#452135", size: 0, })
    const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 100];
    console.log(state);
    return <div {...props} style={{ overflowY: "scroll" }}>
        <div className={props.className + "-editor"}>
            <div className={props.className + "-editor-colorPicker"}>
                <HexColorPicker style={{width:"50%"}} color={state.color} onChange={(e) => setState(state => ({ ...state, color: e }))}  />
            </div>
            <div className={props.className + "-editor-size"}>

                <select className={props.className + "-editor-size-select"} onChange={(e) => setState(state => ({ ...state, size: e.target.value }))}>
                    {sizes.map(size => {
                        return <option value={size}>{size}</option>
                    })}
                </select>
            </div>
            <div className={props.className + "-editor-clear"}>
                <button className={props.className + "-editor-clear-undo"} onClick={() => { ref.current.undo(); }} >Undo</button>
                <button className={props.className + "-editor-clear-undo"} onClick={() => { ref.current.clear(); }}> clear </button>
            </div>
            <br />
            <div className={props.className + "-editor-clear"}>
                <button className={props.className + "-editor-clear-undo"} onClick={() => {

                    const data = ref.current.getSaveData();

                    console.log(data);
                    if (props.state.editingNote.set === true) {
                        if (props.state.current < props.state.pastStates.length - 1) {
                            let pastStates = props.state.pastStates.slice(0, state.current);
                            props.setState(state => ({ ...state, editingNote: { ...state.editingNote, canvas: [...state.editingNote.canvas, data] }, pastStates: [...pastStates, { ...state.editingNote, canvas: [...state.editingNote.canvas, data] }], current: pastStates.length + 1, addingDrawing: false, addingNoteDrawing: null }));
                        }
                        else {
                            props.setState(state => ({ ...state, editingNote: { ...state.editingNote, canvas: [...state.editingNote.canvas, data] }, pastStates: [...state.pastStates, { ...state.editingNote, canvas: [...state.editingNote.canvas, data] }], current: state.pastStates.length + 1, addingDrawing: false, addingNoteDrawing: null }));
                        }
                    }
                    else {
                        if (props.state.addingNoteDrawing) {
                            props.setState(state => ({
                                ...state, notes: state.notes.map(note => {
                                    if (note.id !== state.addingNoteDrawing) {
                                        return note;
                                    }
                                    else {
                                        return { ...note, canvas: [...note.canvas, data] };
                                    }
                                }), addingNoteDrawing: null, addingDrawing: false
                            }));
                        }
                        else {
                            if (props.state.current < props.state.pastStates.length - 1) {
                                let pastStates = props.state.pastStates.slice(0, state.current);
                                props.setState(state => ({ ...state, new: { ...state.new, canvas: [...state.new.canvas, data] }, pastStates: [...pastStates, { ...state.new, canvas: [...state.new.canvas, data] }], current: pastStates.length + 1, addingDrawing: false, addingNoteDrawing: null }));
                            }
                            else {
                                props.setState(state => ({ ...state, new: { ...state.new, canvas: [...state.new.canvas, data] }, pastStates: [...state.pastStates, { ...state.new, canvas: [...state.new.canvas, data] }], current: state.pastStates.length + 1, addingDrawing: false, addingNoteDrawing: null }));
                            }
                        }

                    }

                }} >DONE</button>
            </div>
        </div>
        <div className={props.className + "-canvas"}>
            <CanvasDraw ref={ref} hideGrid={true} hideInterface={true} catenaryColor="transparent" brushRadius={state.size} brushColor={state.color} canvasHeight={(window.innerHeight * 80 / 100)} canvasWidth={(window.innerWidth * 50 / 100)} />
        </div>
    </div>
}

export const DisabledCanvas = (props) => {
    if (props.type) {
        if (props.type === 'in-note') {
            if (props.length > 1) {
                return <CanvasDraw hideGrid={true} hideInterface={true} immediateLoading={true} saveData={props.data} disabled={true} catenaryColor="transparent" canvasHeight={68.4} canvasWidth={68.4} />
            }
            else {
                return <CanvasDraw hideGrid={true} hideInterface={true} immediateLoading={true} saveData={props.data} disabled={true} catenaryColor="transparent" canvasHeight={81} canvasWidth={81} />
            }
        }
    }
    return <CanvasDraw hideGrid={true} hideInterface={true} immediateLoading={true} saveData={props.data} disabled={true} catenaryColor="transparent" canvasHeight={162} canvasWidth={162} />

}
export default Canvas;