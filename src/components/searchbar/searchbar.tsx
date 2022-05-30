import { useState } from "react";
import {
  Slide,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  styled,
  alpha,
  Autocomplete,
  TextField,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Iconify } from "components";
import { useStore } from "effector-react";
import { $products } from "models/products";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Searchbar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const products = useStore($products);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen} data-testid="searchbar-button">
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Autocomplete
              fullWidth
              noOptionsText="There are no products matching your search"
              options={products}
              autoHighlight
              data-testid="searchbar-autocomplete"
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <Link
                  component={RouterLink}
                  color="inherit"
                  to={`/products/${option.id}`}
                  underline="hover"
                >
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={option.image}
                      alt={option.title}
                    />
                    {option.title}
                  </Box>
                </Link>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    fullWidth: true,
                    endAdornment: false,
                    placeholder: "Search…",
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify
                          icon="eva:search-fill"
                          sx={{ color: "text.disabled", width: 20, height: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};

export default Searchbar;
