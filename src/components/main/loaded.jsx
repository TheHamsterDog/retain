import React from 'react';
const NavBar = React.lazy(() => import("../sub/navigation"));
const Labels = React.lazy(() => import("../sub/labels"));
const Notes = React.lazy(() => import("../sub/notes"));
const Loaded = () => {
    const [state, setState] = React.useState({ labels: [], currentLabel: "", search: "" });

    return (<React.Suspense fallback={<div>Loading</div>}>
        <NavBar />
        <Labels />
        <Notes />
    </React.Suspense>);

}
export default Loaded;