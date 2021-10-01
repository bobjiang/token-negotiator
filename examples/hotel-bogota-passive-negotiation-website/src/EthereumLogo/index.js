import './EthereumLogo.css';

// Just for looks: an animated Ethereum Logo. 
// thanks to Red5Point1 https://codepen.io/Red5Point1 for providing this animation.

const EthereumLogo = () => {
  return (
    <div className="ethScale">
      <div id="space">
        <div className="elogo">
          <div className="trif u1"></div>
          <div className="trif u2"></div>
          <div className="trif u3"></div>
          <div className="trif u4"></div>
          <div className="ct"></div>
          <div className="trif l1"></div>
          <div className="trif l4"></div>
        </div>
      </div>
    </div>
  )
}

export default EthereumLogo;