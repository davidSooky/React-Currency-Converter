import "./Header.css";

const Header = ({ date }) => {

    return(
        <div className="header">
            <div>
                <i className="fas fa-dollar-sign fa-2x"></i>
                <i className="fas fa-euro-sign fa-2x"></i>
                <i className="fas fa-yen-sign fa-2x"></i>
            </div> 
            <div>
                <h1>Currency Converter</h1>
            </div>
            <div className="date">
                <p>Currency rate for: {date}</p>
            </div>
      </div>
    );
};

export default Header;