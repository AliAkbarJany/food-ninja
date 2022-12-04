import React from 'react';
import VendorList from '../../components/VendorList';
import Navbar from '../../shared/Navbar/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h2 className='mt-40'>Home Page</h2>
            <VendorList></VendorList>
        </div>
    );
};

export default Home;