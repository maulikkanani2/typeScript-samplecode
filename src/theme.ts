import { createMuiTheme } from '@material-ui/core/styles/index'

export default createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#025faf',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#af405a',
        },
        background: {
            paper: '#fff',
            default: '#f6f6f6',
        },
    },
    typography: {
        htmlFontSize: 16,
    },
})
