import "./Header.css";

const Header = () => {
    const currentDate = new Date().toLocaleDateString();

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
                <p>{currentDate}</p>
            </div>
      </div>
    );
};

export default Header;