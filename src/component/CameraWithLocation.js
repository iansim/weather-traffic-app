import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
/**
 * @param  camera , clickArea
 * stateless compoment To display camera with location
 */
const CameraWithLocation = ({ camera,clickArea }) => {
    const classes = useStyles();
    return <Grid container spacing={3} key={camera.location.latitude}>
        <Grid item xs={12} sm={8}>
            <Paper className={classes.paper} onClick={() => { clickArea(camera.area) }}>
                <label>{camera.area}</label>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>{camera.weather}</Paper>
        </Grid>
        <Grid item xs={12} sm={8} key={camera.image}>
            <Paper className={classes.paper}>
                <img src={camera.image} height="200" />
            </Paper>
        </Grid>
    </Grid>

}

export default CameraWithLocation