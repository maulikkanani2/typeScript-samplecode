import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";

export default (theme: Theme): StyleRules<string> => ({
    header: {
        marginBottom: theme.spacing(2)
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    eventList: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    eventRow: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },

    detailContainer: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        overflow: 'hidden',
    },
    content: {
        padding: theme.spacing(1)
    },
    keyValuePair: {
        marginBottom: theme.spacing(1) / 4,
    },
    errorStatusCode: {
        color: 'red'
    },
    successStatusCode: {
        color: 'green'
    }
})
