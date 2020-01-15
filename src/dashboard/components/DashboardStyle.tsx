import {Theme} from "@material-ui/core";

export default (theme: Theme) => ({
    header: {
        marginBottom: theme.spacing(2)
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    ok: {
        color: "green"
    },
    alert: {
        color: "red"
    },
    warning: {
        color: "yellow"
    }
})
