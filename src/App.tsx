import React from 'react';
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Header from './app/header/Header'
import Footer from './app/footer/Footer'

import theme from './theme'
import routes from './routes'

const App: React.FC = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Header />
                    <Switch>
                        {routes.map(prop => <Route path={prop.path} exact={prop.exact} key={`route-${prop.path}`} component={prop.component} />)}
                    </Switch>
                    <Footer />
                </MuiThemeProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
