import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";

export default (theme: Theme): StyleRules<string> => ({
    header: {
        marginBottom: theme.spacing(2)
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    formLayout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(800 + theme.spacing(6))]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    formContainer: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing(1),
    },
    formHeader: {
        marginBottom: theme.spacing(1),
    },
})
