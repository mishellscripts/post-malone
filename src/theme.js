import { createMuiTheme } from '@material-ui/core/styles';

const LIGHT_BLUE = '#f1f6fd';
const PRIMARY_BLUE = '#aecbf3';
const TEXT_COLOR = '#787B7E';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: LIGHT_BLUE,
      main: PRIMARY_BLUE,
      dark: TEXT_COLOR,
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    body2: {
      lineHeight: 2,
    },
    allVariants: {
      marginBottom: 8,
      color: TEXT_COLOR,
    },
  },
  overrides: {
    MuiTextArea: {
      color: PRIMARY_BLUE,
    },
    MuiInput: {
      input: {
        fontSize: 14,
      },
      underline: {
        '&:before': {
          borderBottom: `1px solid ${TEXT_COLOR}`,
        }
      }
    },
    MuiSvgIcon: {
      root: {
        fill: TEXT_COLOR,
      },
    },
    MuiButton: {
      root: {
        backgroundColor: LIGHT_BLUE,
        color: TEXT_COLOR,
        textTransform: 'none',
        fontWeight: 'bold',
      },
      text: {
        padding: '8px 20px',
      },
    }
  }
});

export default theme;