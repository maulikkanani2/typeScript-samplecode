import * as React from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
import {Grid, Card, CardActionArea, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import {Link} from "react-router-dom";
import {AppState} from "../../app/app.type";
import {useEffect} from "react";
import {GET_API_LIST} from "../apis.action";
import {Api} from "../apis.type";
import {RoutePathsEnum} from "../../routes";
import ApiListLoadingShimmer from "./ApiListLoadingShimmer";

interface ApiListProps {
    dispatch: Function
    apiList: Api[]
    getApiList: () => (void)
    pending: boolean
    classes: any
}

const ApiList: React.FC<ApiListProps> = (props: ApiListProps) => {
    const {classes, getApiList, apiList, pending} = props

    useEffect(() => {
        getApiList()
    }, [getApiList]);

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.header}>
                APIs
            </Typography>
            {pending &&
            <ApiListLoadingShimmer/>
            }
            {!pending &&
            <Grid container spacing={3}>
                {
                    apiList.map((api: Api) => (
                        <Grid item xs={12} md={4} lg={3}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {api.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Proxy Host: {api.proxyUrl}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" component={Link}
                                            to={RoutePathsEnum.EVENT_STREAM.replace(':id', api.id)}>
                                        Events Stream
                                    </Button>
                                    <Button size="small" color="primary">
                                        Settings
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
                {/*<Grid item xs={12} md={4} lg={3}>*/}
                {/*    <Button size="large" color="primary" variant="contained" component={Link}*/}
                {/*            to={RoutePathsEnum.ADD_API}>*/}
                {/*        <Add className={classes.leftIcon}/>*/}
                {/*        Add API*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
            </Grid>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: AppState) => ({
    apiList: state.apis.apiList,
    pending: state.apis.pending,
})

const mapDispatchToProps = (dispatch: Function) => ({
    getApiList: () => dispatch({type: GET_API_LIST, payload: {}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ApiList))
