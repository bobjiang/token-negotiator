
import React, { useReducer } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import './BookingModal.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0071c3',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


// BOOKING MODAL COMPONENT
// Booking form

export default function BookingModal({ room, book }) {

  const { type, price, image, frequency } = room;

  // Modal State (open boolean)
  const [open, setOpen] = React.useState(false);

  // Form state.
  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), { 
    reference: "Beeple",
    cardNo: "00000000000", 
    cardSort: "00-00-00",
    cardCsv: "000"
  });

  // Handle form input.
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  // Simple validation check.
  const formIsDisabled = () => {
    return false;
  }

  // handle form submission.
  const handleSubmit = evt => {
    evt.preventDefault();
    book({ formInput, type });
  };

  // Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary" className="bookButton" onClick={handleClickOpen} variant="contained">
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <div className='modalContainer'>
          <div style={{ width: '100%', height: '138px', overflow: 'hidden' }}>
            <img 
              style={{ width: '100%', position: 'relative', top: '-71px' }}
              src={image}
            />
          </div>
          <DialogTitle
            className="title"
            disableTypography={true}
          >
            {type}
          </DialogTitle>
          { !room.applyDiscount &&
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              COP {price} / {frequency}
            </Typography>
          </CardContent>
        }
        { room.applyDiscount &&
          <CardContent>
              <div style={{display: 'flex'}}>
                <Typography
                  style={{ color: '#d3182e', textDecoration: 'line-through', marginRight: '4px'}}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  COP {room.price} / {frequency} 
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  COP {room.discountPrice} / {frequency}
                </Typography>
              </div>
          </CardContent>
        }
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="booking-name"
                label="Reference name"
                placeholder="Beeple"
                value="Beeple"
                helperText="(a check-in reference name for your booking)"
                fullWidth
                name="reference"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-no"
                label="Card Number"
                fullWidth
                placeholder="00000000000"
                value="00000000000"
                name="cardNo"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-sort"
                label="Card Sort Number"
                fullWidth
                placeholder="00-00-00"
                value="00-00-00"
                name="cardSort"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-csv"
                label="CSV"
                fullWidth
                value="000"
                placeholder="000"
                name="cardCsv"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </DialogContent>
          <div className="booking">
          <DialogActions>
          <Button
              color="primary"
              className="paynow"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              disabled={formIsDisabled()}
            >
              Pay Now
          </Button>
          </DialogActions>
        </div>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}



