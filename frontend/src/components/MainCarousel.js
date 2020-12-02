import React from 'react'
import { Carousel } from 'react-bootstrap'
import image1 from '../images/ohp.jpg'
import image2 from '../images/Lrtrainer.jpg'
import image3 from '../images/deadlift.jpg'

const MainCarousel = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            height={500}
            src={image1}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Multiple Classes Available Daily</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            height={500}
            src={image2}
            alt='Third slide'
          />

          <Carousel.Caption style={{ color: 'black' }}>
            <h3>Find a Coach today!</h3>
            <p>All of our coaches are certified</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            height={500}
            src={image3}
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Strength Training</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default MainCarousel
