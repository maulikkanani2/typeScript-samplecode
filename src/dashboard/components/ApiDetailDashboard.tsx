import * as React from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './DashboardStyle'
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar
} from '@material-ui/core'
import {
    ArrowUpward,
} from '@material-ui/icons'
import {AuthState} from "../../auth/auth.type";
import {AppState} from "../../app/app.type";

interface ApiListProps {
    dispatch: Function
    auth: AuthState
    classes: any
}

const DashboardDetail: React.FC<ApiListProps> = (props: ApiListProps) => {
    const {classes} = props

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Grid container direction="row" spacing={1}>
                    <Grid item>
                        <Avatar className={classes.avatar} src={require('../assets/google-maps.svg')}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" className={classes.header}>
                            Google Maps
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="row" spacing={2}>
                    <Grid item lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Typography variant="h5" component="h2">
                                        Total Request
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="h1" color="textPrimary" component="p">
                                    7.3k
                                    <Typography className={classes.ok}  variant="subtitle2" color="textSecondary" component="span">
                                        <ArrowUpward /> 7.5 %
                                    </Typography>

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Typography variant="h5" component="h2">
                                        Total Errors
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="h1" color="textPrimary" component="p">
                                    0
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Typography variant="h5" component="h2">
                                        Uptime SLA
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="h1" color="textPrimary" component="p">
                                    99.95%
                                    <Typography className={classes.ok}  variant="subtitle2" color="textSecondary" component="span">
                                        5.5 %
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Typography variant="h5" component="h2">
                                        95 PCT Latency
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="h1" color="textPrimary" component="p">
                                    599 ms
                                    <Typography className={classes.alert}  variant="subtitle2" color="textSecondary" component="span">
                                        <ArrowUpward /> 10.5 %
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default connect((state: AppState) => ({
    auth: state.auth,
}))(withStyles(style)(DashboardDetail))
