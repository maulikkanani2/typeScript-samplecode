import React from 'react'
import classNames from 'classnames'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import {AppBar, Toolbar, Button} from '@material-ui/core'

import headerStyle from './HeaderStyle'
import {AuthState} from "../../auth/auth.type";
import {AppState} from "../app.type";
import {SIGN_OUT} from "../../auth/auth.action";

type HeaderProps = {
    signOut: Function,
    auth: AuthState,
    classes: any
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { classes, signOut } = props
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes.dark]: 'dark',
    })
    return (
        <AppBar position="static" className={appBarClasses}>
            <Toolbar>
                <img src={require('../../assets/logo-light.png')} className={classes.img} alt="ApiTracker Logo"/>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    {props.auth.user &&
                    <Button onClick={() => {signOut()}} color="inherit">Sign Out</Button>
                    }
                    {!props.auth.user &&
                    <Link to="/sign-in" color="inherit">Sign In</Link>
                    }
                </div>

            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
})

const mapDispatchToProps = (dispatch: Function) => ({
    signOut: () => dispatch({type: SIGN_OUT}),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerStyle)(Header))
