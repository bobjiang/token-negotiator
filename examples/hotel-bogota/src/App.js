import React, { useState, useEffect } from 'react';
import LogoCard from './LogoCard';
import RoomCard from './RoomCard';
import TokenNotificationCard from './TokenNotificationCard';
import Typography from '@material-ui/core/Typography';
import EthereumLogo from './EthereumLogo';
import BookingDate from './BookingDate';
import { Negotiator } from 'token-negotiator';
import './App.css';
  
// mock data e.g. server side hotel room price database
const mockRoomData = [{"type":"Deluxe Room","price": 200000,"frequency":"per night","image":"./hotel_3.jpg"},{"type":"King Suite","price": 320000,"frequency":"per night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price": 250030,"frequency":"per night","image":"./hotel_1.jpg"}]
// mock discount of 10% applied to any ticket selected. In a real world scenario, this maybe different per ticket type and retrieved from a backend service.
const mockRoomDiscountData = 10;

function App() {

  // add filters when specific tokens are required
  const filter = {};
  // apply the tokenId to negotiate tokens from e.g. devcon-ticket.
  const tokenId = "devcon-ticket";
  // set required negotiator options
  const options = { 
    userPermissionRequired: true
  };
  // Create new instance of the Negotiator with params
  let negotiator = new Negotiator(filter, tokenId, options);

  // Devcon Tickets (local react state of tokens)
  let [tokens, setTokens] = useState([]);

  // local react state of token specical offer
  let [freeShuttle, setFreeShuttle] = useState(false);

  // local react state of hotel room data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // Selected token instance to apply discount, with the discount value on hotel booking.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  // Token proof
  let [useDiscountProof, setUseDiscountProof] = useState({ status: false, useTicket: undefined, ethKey: undefined });

  // async example of initial hotel data loaded from source
  const getRoomTypesData = () => {
    return mockRoomData;
  }

  // example to return a discount
  const getApplicableDiscount = () => {
    return mockRoomDiscountData;
  }

  // When a ticket is present and user applies it, the discount will be shown
  const applyDiscount = async (ticket) => {

    // When unselecting the ticket (removes room discounts offered)
    if (!ticket || ticket === null) {
      
      // clear discount
      setDiscount({ value: undefined, tokenInstance: undefined });
      // clear discount proof data
      setUseDiscountProof({ status: false, useTicket: undefined, ethKey: undefined });

    } else {

      // const { status, useTicket, ethKey } = await negotiator.authenticate(ticket, unEndPoint);

      // unpredictable number end point
      const unEndPoint = "https://www.github.com/someMock.json";
      const { status, useTicket, ethKey } = ((unEndPoint) => {
        return {
          status: true,
          useTicket: "ABC",
          ethKey: "123"
        }
      })();
      
      if(status === true) {

        // store token proof details for when the end user wants
        // to finalise this examples transation to book a room.
        setUseDiscountProof({status, useTicket, ethKey});
        
        // share discount price with the user.
        setDiscount({ value: getApplicableDiscount(), tokenInstance: ticket });

      } else {

        // handle scenario when the authentication process for discount was not valid.

      }
    }
  }

  // Complete transaction
  const book = async (form) => {

    debugger;
  
    // Example of how data could be sent to backend server
    // to begin a transaction process
    postData('https://bogotbackend/pay', { 
      proof: { useTicket, ethKey },
      bookingData: { roomType, dates },
      paymentData: { paymentDetails, discountType }
    })
    .then(data => {
      alert('Transaction Complete, we look forward to your stay with us!');
    });
    
  }

  // negotiation happens when this method is triggered
  // before this time, the token-negotiator is not used.
  const getTokens = () => {
    negotiator.getTokenInstances(res => {
      if(res.success){
        setTokens(res.tokens);
        setFreeShuttle(true);
      }
    });
  }

  // react effect
  useEffect(() => {
    // assign room data to react local state
    setRoomTypesData(getRoomTypesData());
  }, []);

  return (
    <div>
      <div className="header">
        <LogoCard title={"Hotel Bogota"} />
        <TokenNotificationCard getTokens={e=>getTokens()} negotiator={negotiator} tokensNumber={tokens.length} />
      </div>
      <BookingDate />
      <div className="roomCardsContainer">
        {roomTypesData.map((room, index) => {
          return <RoomCard
            key={index}
            room={room}
            applyDiscount={applyDiscount}
            discount={discount}
            tokens={tokens}
            book={book}
          />
        })}
      </div>
      {
        freeShuttle &&
        <div>
          <EthereumLogo />
          <Typography
            style={{ padding: '20px' }}
            className="applyDiscountCopyContainer"
            gutterBottom
            variant="body2"
            component="p">
            Free shuttle service available to you as a Devcon Ticket holder! Enjoy the event.
          </Typography>
        </div>
      }
    </div>
  );
}

export default App;
