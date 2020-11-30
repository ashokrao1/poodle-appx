//import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react'
import { useRoutes } from 'app-x/router'
import PropTypes from 'prop-types'
import { ThemeProvider, Box, Button, Grid, CssBaseline, makeStyles } from '@material-ui/core'
import { Provider } from 'react-redux'

import GlobalStyles from 'app-x/components/GlobalStyles'
import HeaderLayout from 'app-x/pages/layouts/headerLayout'
import NotFoundView from 'app-x/views/errors/NotFoundView'

const MUI_App = (props) => {

  // process not_found
  const not_found = props.not_found_view || (<HeaderLayout><NotFoundView/></HeaderLayout>)

  // process routes
  const routeResult = useRoutes(props.routes)

  return (
    <Provider store={props.redux_store_provider}>
      <ThemeProvider theme={props.theme_provider}>
        <GlobalStyles />
        {routeResult || not_found}
      </ThemeProvider>
    </Provider>
  )
}

MUI_App.propTypes = {
  routes: PropTypes.object.isRequired,
  redux_store_provider: PropTypes.object.isRequired,
  theme_provider: PropTypes.object.isRequired,
  not_found_view: PropTypes.element
}

export default MUI_App;

/*
routes: PropTypes.arrayOf(
  PropTypes.shape({
    route: PropTypes.string.isRequired,
    element: PropTypes.function.isRequired
  })
).isRequired,
*/