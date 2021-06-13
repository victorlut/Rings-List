import React from 'react';
import { GetServerSideProps } from 'next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Listing, Category } from '../../interfaces';

import Layout from '../../components/Layout';
import { useDataHandler } from '../../context/data.context';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const CATEGORIES = [
  { value: 1, label: 'cars' },
  { value: 2, label: 'housing' },
  { value: 3, label: 'services' },
  { value: 4, label: 'apparel' },
  { value: 5, label: 'electronics' },
  { value: 6, label: 'miscellaneous' },
];

type Props = {
  listing: Listing;
  categories: Category[];
};

const EditListing = ({ categories, listing }: Props) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    setId,
    categoryId,
    setCategoryId,
    editing,
    heading,
    setHeading,
    clearValues,
    handleDelete,
    handleCancel,
    handleSubmit,
  } = useDataHandler();
  const categoryOptions = [
    { value: '', label: 'Category' },
    ...CATEGORIES,
  ];
  const classes = useStyles();

  React.useEffect(() => {
    if (editing) {
      setId(listing.id);
      setHeading(`Editing ${listing.title}`);
      setTitle(listing.title);
      setDescription(listing.description);
      setPrice(listing.price);
      setCategoryId(listing.category_id);
    } else {
      clearValues();
    }
  }, [editing]);

  return (
    <Layout title={listing.title} categories={categories}>
      <>
        <Paper className={classes.paper}>
          <form id="listing" onSubmit={handleSubmit}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
            >
              {heading}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="title"
                  label="Listing Title"
                  fullWidth
                  autoComplete="For sale"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  autoComplete="About the listing"
                />
                <TextareaAutosize
                  rowsMax={4}
                  required
                  id="description"
                  aria-label="description"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  labelId="Category"
                  id="category_id"
                  value={categoryId}
                  onChange={(e: any) => setCategoryId(e.target.value)}
                >
                  {categoryOptions.map((category) => (
                    <MenuItem value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="price"
                  label="Price"
                  fullWidth
                  autoComplete="₱100"
                  value={price}
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>

        <div className={classes.buttons}>
          {editing && (
            <form id="delete-listing" onSubmit={handleDelete}>
              <Button
                className={classes.button}
                type="submit"
                form="delete-listing"
              >
                Delete
              </Button>
            </form>
          )}

          <Button className={classes.button} onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            className={classes.button}
            type="submit"
            form="listing"
            variant="contained"
            color="primary"
          >
            {editing ? 'Update' : 'Add'}
          </Button>
        </div>
      </>
    </Layout>
  );
};

// This also gets called at build time
export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const param = params?.id.toString();

  const res = await fetch(
    `https://rlist-backend.herokuapp.com/api/listing/${param}`
  );
  const listing = await res.json();

  const ress = await fetch(
    'https://rlist-backend.herokuapp.com/api/categories'
  );
  const categories = await ress.json();

  return {
    props: {
      listing,
      categories,
    },
  };
};

export default EditListing;
