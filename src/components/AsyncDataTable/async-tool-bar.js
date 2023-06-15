import React, { useState } from 'react';
import {
  Toolbar,
  alpha,
  Grid,
  FormControlLabel,
  Switch,
  IconButton,
  Stack,
  InputBase,
  Button,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Add from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const AsynTableToolbar = (props) => {

  const {
    setSelectedData,
    numSelected,
    dense,
    handleChangeDense,
    handleAddNewEvent,
    title = 'Datatable',
    searchPlaceHolder = 'Search',
    searchText,
    useActions
  } = props;

  const [searchVal, setSearchVal] = useState('');

  const setSearchText = (val) => {
    props.setSearchText(val);
    setSearchVal(val);
    console.log(searchVal);
  }

  const clearVal = () => {
    setSearchVal('');
    setSearchText('');
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }
      }
    >
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={5}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle" component="div"
                sx={{ 
                  // background: '#f2eeee', 
                  // paddingLeft: 2, 
                  // paddingRight: 2, 
                  // borderRadius: 2, 
                  color: '#1976d2', 
                  fontWeight: 'bold' 
                }}
              >
                {title}
              </Typography>
            )}

            {
              useActions?.search &&
              <Paper sx={{ boxShadow: 'unset!important' }}>

                <IconButton sx={{ p: '0px' }} aria-label="search" color='primary'>
                  <SearchIcon />
                </IconButton>

                <InputBase
                  placeholder={searchPlaceHolder}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  value={searchText}
                  sx={{ ml: 1, flex: 1 }}
                  onChange={(event) => setSearchText(event.target.value)}
                  size='medium'
                />

                {searchVal &&
                  <IconButton sx={{ p: '0px' }} onClick={() => clearVal()} aria-label="search" color='error'>
                    <CloseIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                }

              </Paper>
            }

          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          {useActions?.create && (
            <Tooltip title="Add New">
              <Button
                sx={{ marginRight: 2 }}
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddNewEvent}
              >
                Add
              </Button>
            </Tooltip>
          )}
          {
            useActions?.dense &&
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
            // label="Dense padding"
            />
          }

        </Grid>
      </Grid>
    </Toolbar>
  );
};

AsynTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  dense: PropTypes.bool.isRequired,
  handleChangeDense: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  searchPlaceHolder: PropTypes.string,
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

export default AsynTableToolbar;
