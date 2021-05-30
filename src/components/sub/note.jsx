let i = 1;
let theme = i === 0 ? "light-" : "dark-";
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