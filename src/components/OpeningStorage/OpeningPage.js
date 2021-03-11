import React from 'react';
import '../../../src/App.css';
import '../OpeningStorage/OpeningPage.css';




function OpeningPage() {
    return (
        <div className='openingPage-container'>
            <div className='openingPage-wrapper'>
                <img className='Openingpage-logo' src='./images/logo_2.png' width='300px' height='300px'/>
                <img className='Openingpage-stair' src='./images/stairs.png' width='300px' height='300px'/>
            </div>
        </div>
    );
}
export default OpeningPage;