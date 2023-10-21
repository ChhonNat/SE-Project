import { ExpandLess, ExpandMore, FilterList } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Switch,
  TextField,
  Toolbar,
  alpha
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AsyncAutoComplete from '../AutoComplete/auto-complete';
import { makeStyles } from "@mui/styles";
import SelectComponent from '../Selector/select';

const shrinkOpt = { shrink: true };

const useStyles = makeStyles({
  field: {
    "&&": {
      marginRight: "24px"
    }
  }
});

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
    useActions,
    handleFilterEvent
  } = props;

  const classTextField = useStyles();


  const [searchVal, setSearchVal] = useState('');
  const [openCollapse, setOpenCollape] = useState(false);

  const setSearchText = (val) => {
    props.setSearchText(val);
    setSearchVal(val);
  }

  const clearVal = () => {
    setSearchVal('');
    setSearchText('');
  }

  //Handle toggle click open collapse
  const handleClick = () => {
    setOpenCollape(!openCollapse)
  };

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

        <Grid item xs={12}>
          {
            useActions?.filter ?
              <>
                <List
                  sx={{ width: "100%", bgcolor: "background.paper", paddingTop: '0px' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton
                    onClick={() => handleClick()}
                    sx={{
                      marginBottom: '1rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FilterList fontSize='small' />
                          <label style={{ fontWeight: "bold", fontSize: 13 }}>Filter</label>
                        </div>
                      }
                    />
                    {openCollapse ? (<ExpandLess />) : (<ExpandMore />)}
                  </ListItemButton>
                  <Collapse
                    in={openCollapse}
                    timeout="auto"
                    unmountOnExit
                  >

                    <Grid container xs={12} >
                      {
                        useActions?.filterOption?.filters?.length ?
                          useActions?.filterOption?.filters?.map((filter, index) => (
                            <>
                              <Grid xs={filter?.grid ? filter?.grid : 2} key={index} marginBottom={2}>
                                {
                                  filter?.type && ["date"].includes(filter?.type) &&
                                  <TextField
                                    label={filter?.label ? filter?.label : "Date"}
                                    size="small"
                                    sx={{ width: "100%" }}
                                    type="date"
                                    InputLabelProps={shrinkOpt}
                                    onChange={(e) => handleFilterEvent(filter?.filterName, e?.target?.value)}
                                    value={filter?.value}
                                    InputProps={{
                                      inputProps: { max: filter?.max, min: filter?.min },
                                      className: classTextField.field
                                    }}
                                  />
                                }
                                {
                                  filter?.type && ["text"].includes(filter?.type) &&
                                  <TextField
                                    label={filter?.label ? filter?.label : "Text"}
                                    size="small"
                                    sx={{ width: "100%" }}
                                    type="text"
                                    InputLabelProps={shrinkOpt}
                                    onChange={(e) => handleFilterEvent(filter?.filterName, e?.target?.value)}
                                    value={filter?.value}
                                    InputProps={{
                                      className: classTextField.field
                                    }}
                                  />
                                }
                                {
                                  filter?.type && ["select"].includes(filter?.type) &&
                                  <AsyncAutoComplete
                                    label={filter?.label ? filter?.label : "Select"}
                                    size="small"
                                    sx={{ width: "100%", marginRight: 3 }}
                                    callToApi={filter?.selectOption?.asyncUrl}
                                    customDatas={filter?.selectOption?.customDatas}
                                    bindField={filter?.selectOption?.bindField || "name"}
                                    handleOnChange={(e, value) => handleFilterEvent(filter?.filterName, value)}
                                    value={filter?.selectOption?.value}
                                  />
                                }

                                {
                                  filter?.type && ["normal-select"].includes(filter?.type) &&
                                  <SelectComponent
                                    id={"id"}
                                    label={filter?.label ? filter?.label : "Select"}
                                    size={"small"}
                                    sx={{ width: "100%", marginRight: 3 }}
                                    callToApi={filter?.selectOption?.asyncUrl}
                                    customDatas={filter?.selectOption?.customDatas}
                                    handleOnChange={(e, value) => handleFilterEvent(filter?.filterName, value)}
                                    value={filter?.selectOption?.value}
                                  />
                                 
                                }

                              </Grid>

                            </>
                          ))
                          :
                          <></>
                      }
                    </Grid>

                    {/* <Grid container xs={12} justifyContent="end">
                      <Button onClick={handleClear} className="materialBtn">
                        Clear
                      </Button>
                    </Grid> */}
                  </Collapse>
                </List>
              </>
              :
              <>
              </>
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
