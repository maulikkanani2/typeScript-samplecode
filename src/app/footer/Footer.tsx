import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Grid, Button, Toolbar } from '@material-ui/core'

import footerStyle from './FooterStyle'

type FooterProps = {
    classes: any
}
export default withStyles(footerStyle)((props: FooterProps) => {
    const { classes } = props
    return (
        <Grid container>
            <Grid item xl={12} className={classes.footerSection}>
                <Toolbar>
                    <Button href="//trafficlens.io/" color="secondary">TrafficLens</Button>
                    <Button href="//trafficlens.io/about/" color="secondary">About Us</Button>
                    <Button href="//trafficlens.io/tos/" color="secondary">Terms</Button>
                    <Button href="//trafficlens.io/privacy-policy/" color="secondary">Privacy Policy</Button>
                    <Button href="//trafficlens.io/security/" color="secondary">Security</Button>
                    <Button href="mailto:info@trafficlens.io" color="secondary">Contact us</Button>
                </Toolbar>
            </Grid>
        </Grid>
    )
})
