//import MaterialUI from '@material-ui/core';
const MaterialUI = module['@material-ui/core']

import typography from '/appx/theme/topography.js'

const { createMuiTheme, colors } = MaterialUI;

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.blue[800]
    },
    secondary: {
      main: colors.lightBlue[800]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      error: colors.red[900],
    }
  },
  shape: {
      borderRadius: 0,
  },
  typography
});

export default theme;
