import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarDesktop: {
    backgroundColor: '#f8f8f8',
    color: '#fff',
  },
  appbarMain: {
    backgroundColor: '#2d2d2d',
  },
  appbarSecondary: {
    backgroundColor: '#525050',
    color: '#fff',
  },
  appbarPromotion: {
    backgroundColor: '#2d2d2d',
    color: '#fff',
  },
  toolbarDesktop: {
    padding: '0px',
    minHeight: 30,
  },
  toolbarMain: {
    padding: '0px',
    minHeight: 60,
    display: 'flex',
    paddingTop: theme.spacing(0),
    justifyContent: 'space-between',
  },
  toolbarSecondary: {
    padding: '0px',
    minHeight: 50,
    display: 'flex',

    justifyContent: 'space-between',
  },
  toolbarPromotion: {
    padding: '0px',
    minHeight: 50,
  },
  svg: {
    fill: '#fff',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0',
  },
  menuListItem: {
    padding: 0,
    paddingRight: 20,
    textTransform: 'capitalize',
  },
  listItemLink: {
    fontSize: 13,
    color: '#fff',
    textDecoration: 'none',
  },
}));
