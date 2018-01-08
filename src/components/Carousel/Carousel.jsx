import React from 'react';
import Slider from 'react-slick';
import Slide from '../Slide/Slide.jsx';
import s from './Carousel.scss'; 

export default class Carousel extends React.Component {
    
  mountSlider() {
    return (
      <div>
        { this.getSlides() }
      </div>
   );
  }

  hasCacheExpired() {
    let response;

    if (localStorage.getItem('date') !== null) {
      const now = new Date();
      const cacheData = new Date(localStorage.getItem('date'));

      let secondsDiff = (now.getTime() - cacheData.getTime()) / 1000;
      let minutesDiff = Math.floor(secondsDiff/60);

      response = minutesDiff > 2
        ? response = true
        : response = false;

    }
    else {
      response = true;
    }
    
    return response;
  }

  fetchJSONUrl(url) {
    const HttpReq = new XMLHttpRequest();
    HttpReq.open("GET", url, false);
    HttpReq.send(null);

    let events = HttpReq.responseText;
    let date = new Date();
    
    localStorage.setItem('date', date);
    localStorage.setItem('content', events);

    return events;
  }

  getJSONData(url) {
    let liveEvents;
     
    // Checks if there is a Cache, or it has expired
    if (this.hasCacheExpired()) {
      liveEvents = this.fetchJSONUrl(url);
    // There is a Cache, but not expired
    }
    else {
      return JSON.parse(localStorage.getItem('content'));
    }
      
    return JSON.parse(liveEvents);
  };

  getScore(score) {
    return (
        <h2>{ score.home } - { score.away } </h2>
    );
  }

  formatDate(date) {
    const now = new Date();
    const eventStart = new Date(date);
    let formattedDate;

    now.getDate() == eventStart.getDate()
      ? formattedDate = 'Today'
      : formattedDate = (eventStart.getMonth() + 1) + '/' + eventStart.getDate() + '/' + eventStart.getFullYear();  

    formattedDate += ', ' + eventStart.getHours() + ':' + (eventStart.getMinutes() < 10 ? '0' : '') + eventStart.getMinutes()

    return formattedDate;
  }

  getSport(sport) {
    let className;

    switch (sport) {
      case 'TENNIS':
        className = 'tennis';
        break;
      case 'BASKETBALL':
        className = 'basketball';
        break;
      case 'FOOTBALL':
        className = 'football';
        break;
      default:
        className = 'default';
    }

    return className;
  }

  getSlides() {
    const data = this.getJSONData("http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a");
    let markup = [];
    
    for (let [key, value] of Object.entries(data.liveEvents)) {
      markup.push(
        <div key={ key }>
          <div className='content-wrapper'>
            
            { // Test if there is a score 
              (typeof value.liveData.score !== 'undefined' && value.liveData.score) && this.getScore(value.liveData.score) 
            }

            <h3 className={ this.getSport(value.event.sport) }>{ value.event.homeName } { typeof value.event.awayName !== 'undefined' && ("- " + value.event.awayName) }</h3>
          
            <p className='date'>{ this.formatDate(value.event.start) }</p>

            <a className='btn-green' href={ "https://www.unibet.com/betting#/event/live/" + value.event.id } target="_blank" title="Place a bet">Place a bet</a>

          </div>
        </div>
      );
    }

    const sliderSettings = {
      dots: false,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 500,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Slider { ...sliderSettings }>
        { markup }
      </Slider>
    );
  };

  render() {
    return (
      <div>
        { this.mountSlider() }
      </div>
    );
  }
}
