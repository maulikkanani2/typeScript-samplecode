import React from "react";
import {Link} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import {List, ListItem, Drawer, ListItemIcon} from '@material-ui/core'
import style from './SideBarStyle'
import {Apps, BarChart} from '@material-ui/icons'
import {RoutePathsEnum} from "../../routes";

interface SideBarProps {
    classes: any
}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const {classes} = props
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <List component="nav">
                <ListItem button component={Link} to={RoutePathsEnum.API_LIST}>
                    <ListItemIcon>
                        <Apps/>
                    </ListItemIcon>
                </ListItem>
                <ListItem button component={Link} to={RoutePathsEnum.DASHBOARD_VIEW}>
                    <ListItemIcon>
                        <BarChart/>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    )
}
export default withStyles(style)(SideBar)


