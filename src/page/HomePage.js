import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomeStore from '../store/HomeStore'
import Camera from '../component/Camera'
import CameraWithLocation from '../component/CameraWithLocation'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { observer } from 'mobx-react'

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
 * Home Page
 */
const HomePage = () => {
    const classes = useStyles();
    let {
        state: { cameras, dateObj, timeObj,selectedArea}
    } = HomeStore
    let {
        actions: { changeDate, changeTime, loadAreas,clickArea }
    } = HomeStore
    useEffect(() => {
        loadAreas()// Hook to load data when init the component
    }, [])
    let listedAreas = []
    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={4}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            onChange={changeDate}
                            value={dateObj}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            onChange={changeTime}
                            value={timeObj}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            {cameras.map((camera) => {
                if(selectedArea && selectedArea != camera.area){
                    return ''
                }
                if(listedAreas.includes(camera.area)){
                    return <Camera  camera={camera}/>
                }else{
                    listedAreas.push(camera.area)
                }
                //if location is displayed, no need to display
                return <CameraWithLocation camera={camera}  clickArea={clickArea}/>
            })}
        </div>
    )
}
export default observer(HomePage)