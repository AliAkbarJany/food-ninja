import React from 'react';
import styled from 'styled-components';
import VendorList from '../../components/VendorList';
import Navbar from '../../shared/Navbar/Navbar';
import video from '../../assets/Banner/food_ninja1.mp4'
import WelcomeBanner from '../../components/WelcomeBanner/WelcomeBanner';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <BackgroundVideo autoPlay loop muted playsInline>
                    <source src={video} type="video/mp4" />
                </BackgroundVideo>
            </Container>
            <WelcomeBanner></WelcomeBanner>
            <VendorList></VendorList>
        </div>
    );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 105vh;
  background-image: linear-gradient(rgba(12, 3, 51, 0.3), rgba(12, 3, 51, 0.3));
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;

  @media (min-aspect-ratio: 16/9) {
    height: auto;
    width: 100%;
  }
  /* @media (max-aspect-ratio: 16/9) {
    height: 100%;
    width: auto;
    
    background-size: cover;
  } */
`;