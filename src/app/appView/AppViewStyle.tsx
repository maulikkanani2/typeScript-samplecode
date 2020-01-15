import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";

export default (theme: Theme): StyleRules<string> => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    main: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        minWidth: 0, // So the Typography noWrap works
        height: 'calc(100vh - 65px)',
        overflowY: 'scroll',
    },
    toolbar: theme.mixins.toolbar,
})
