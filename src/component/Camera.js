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
 * @param  camera 
 * stateless compoment To display camera
 */
const Camera = ({camera}) => {
    const classes = useStyles();
    return <Grid container spacing={3} key={camera.image}>
        <Grid item xs={12} sm={8} key={camera.image}>
            <Paper className={classes.paper}>
                <img src={camera.image} height="200" />
            </Paper>
        </Grid>
    </Grid>

}

export default Camera