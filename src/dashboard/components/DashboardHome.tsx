import * as React from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './DashboardStyle'
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar
} from '@material-ui/core'
import {AuthState} from "../../auth/auth.type";
import {Link} from "react-router-dom";
import {AppState} from "../../app/app.type";

interface ApiListProps {
    dispatch: Function
    auth: AuthState
    classes: any
}

const DashboardHome: React.FC<ApiListProps> = (props: ApiListProps) => {
    const {classes} = props


    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Grid container direction="row" spacing={1}>
                    <Typography variant="h4" className={classes.header}>
                        Dashboard
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} src={require('../assets/google-maps.svg')}/>
                                }
                                title={
                                    <Typography variant="h5" component="h2">
                                        Google Maps
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="subtitle2">
                                        Status: <span className={classes.ok}>OK</span>
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Requests: 133k
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Errors: <span className={classes.error}>503</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    SLA: 99.02%
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Projected Billing: $10,500
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" component={Link}
                                        to={`/a/apis/fb4d25d3-6e5c-4413-a81d-60150e105149/dashboard`}>
                                    Detail View
                                </Button>
                                <Button size="small" color="primary">
                                    Settings
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} src={require('../assets/stripe.png')}/>
                                }
                                title={
                                    <Typography variant="h5" component="h2">
                                        Stripe
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="subtitle2">
                                        Status: <span className={classes.ok}>OK</span>
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Requests: 53k
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Errors: <span className={classes.error}>150</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    SLA: 99.98%
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Projected Billing: $5,200
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" component={Link}
                                        to={`/a/apis/C90C94C5-6AA8-4073-B4AF-9BA8457A287F/dashboard`}>
                                    Detail View
                                </Button>
                                <Button size="small" color="primary">
                                    Settings
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar} src={require('../assets/twillio-icon.svg')}/>
                                }
                                title={
                                    <Typography variant="h5" component="h2">
                                        Twillio
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="subtitle2">
                                        Status: <span className={classes.alert}>Unavailable</span>
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Requests: 3k
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Errors: <span className={classes.alert}>2104</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    SLA: 50.98%
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Projected Billing: $1,200
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" component={Link}
                                        to={`/a/apis/C90C94C5-6AA8-4073-B4AF-9BA8457A287F/dashboard`}>
                                    Detail View
                                </Button>
                                <Button size="small" color="primary">
                                    Settings
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default connect((state: AppState) => ({
    auth: state.auth,
}))(withStyles(style)(DashboardHome))
