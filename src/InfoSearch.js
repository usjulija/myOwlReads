import React from 'react';

function InfoSearch (props) {
  if(!props.show) {
    return null;
  }

  return (
    <div className="info-search-background">
      <div className="info-search-modal">
        {props.children}
        <div className="footer">
          <button onClick={props.onClose} className="close-info-search">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoSearch;
