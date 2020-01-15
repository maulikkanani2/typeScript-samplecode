import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";

export default (theme: Theme): StyleRules<string> => ({
  transparent: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    paddingTop: '25px',
    color: '#FFFFFF',
  },
  dark: {
    color: '#FFFFFF',
    backgroundColor: '#212121 !important',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)',
  },
  white: {
    border: '0',
    padding: '0.625rem 0',
    marginBottom: '20px',
    color: '#555',
    backgroundColor: '#fff !important',
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
  },

  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px',
  },
  img: {
    left: '-15px',
    width: '200px',
    // top: '22px',
    position: 'absolute' ,
    verticalAlign: 'middle',
    border: '0',
  },

  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  menuIcon: {
    paddingRight: theme.spacing(1),
  },
})
