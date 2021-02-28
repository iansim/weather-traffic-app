import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import HomePage from './page/HomePage';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Typography variant="h6" className={classes.title}>Weather Forecast and Traffic Cam</Typography>
      </AppBar>
      <HomePage />
    </Container>
  );
}

export default App;
