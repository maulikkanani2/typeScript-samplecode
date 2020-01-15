import {StyleRules, Theme} from "@material-ui/core/styles";

export default (theme: Theme): StyleRules<string> => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        width: theme.spacing(7) + 1
    },
})
