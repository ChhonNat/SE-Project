import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Switch,
  Toolbar,
  alpha
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';


const AsynTableToolbar = (props) => {

  const {
    setSelectedData,
    numSelected,
    dense,
    handleChangeDense,
    handleAddNewEvent,
    handleRefreshEvent,
    title = 'Datatable',
    searchPlaceHolder = 'Search',
    searchText,
    useActions
  } = props;

  const [searchVal, setSearchVal] = useState('');

  const setSearchText = (val) => {
    props.setSearchText(val);
    setSearchVal(val);
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
                  sx={{ ml: 1, flex: 1, minWidth: '250px', borderBottom: '1px solid rgb(224, 224, 224)' }}
                  onChange={(event) => setSearchText(event.target.value)}
                  size='medium'
                />

                {searchVal &&
                  <IconButton sx={{ p: '0px', marginLeft: '-1rem' }} onClick={() => clearVal()} aria-label="search" color='error'>
                    <CloseIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                }

              </Paper>
            }

          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          {
            useActions?.refresh && (
              <Tooltip title="Refresh Data">
                <IconButton
                  color="primary"
                  sx={{ marginRight: 2, paddingX: 1 }}
                  onClick={handleRefreshEvent}
                >
                  <AutorenewIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
            )
          }
          {useActions?.create && (
            <Tooltip title="Add New">
              <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                startIcon={<AddCircleIcon />}
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
