import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
const Loading = () => {
    return (
        <div style={{ position: 'relative', height: "100vh" }}>
            <CircularProgress style={{ position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }} />
        </div>
    )
}
export default Loading;

