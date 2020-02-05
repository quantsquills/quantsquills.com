import Typography from 'typography';
import Theme from 'typography-theme-fairy-gates';

Theme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  body: {
    fontFamily: "'EB Garamond', EBGaramond, Garamond, serif",
    backgroundColor: '#e3f4f9',
    color: 'rgb(13,43,53)',
  },
  a: {
    textShadow: 'none',
    background: 'none',
    textDecoration: 'underline',
  },
  h1: {
    fontFamily: "'EB Garamond', EBGaramond, Garamond, serif",
    fontWeight: 'normal',
  },
});

delete Theme.googleFonts;

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
