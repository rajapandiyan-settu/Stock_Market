import * as React from 'react';
import { useEffect } from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';


export default function KnowMore() {
  let productDetails = [
      {
          ID: 1,
          Title: 'San Francisco',
          Content: 'San Francisco, officially the City and County of San Francisco, is a cultural, commercial, and financial center in the U.S. state of California. Located in Northern California, San Francisco is the 17th most populous city proper in the United States, and the fourth most populous in California.',
          ImgPath: 'https://ej2.syncfusion.com/react/demos/src/carousel/images/san-francisco.jpg',
          URL: 'https://en.wikipedia.org/wiki/San_Francisco'
      }, {
          ID: 2,
          Title: 'London',
          Content: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.',
          ImgPath: 'https://ej2.syncfusion.com/react/demos/src/carousel/images/london.jpg',
          URL: 'https://en.wikipedia.org/wiki/London'
      }, {
          ID: 3,
          Title: 'Tokyo',
          Content: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.',
          ImgPath: 'https://ej2.syncfusion.com/react/demos/src/carousel/images/tokyo.jpg',
          URL: 'https://en.wikipedia.org/wiki/Tokyo'
      }, {
          ID: 4,
          Title: 'Moscow',
          Content: 'Moscow, on the Moskva River in western Russia, is the nation’s cosmopolitan capital. In its historic core is the Kremlin, a complex that’s home to the president and tsarist treasures in the Armoury. Outside its walls is Red Square, Russia`s symbolic center.',
          ImgPath: 'https://ej2.syncfusion.com/react/demos/src/carousel/images/moscow.jpg',
          URL: 'https://en.wikipedia.org/wiki/Moscow'
      }
  ];
  let showButtons: any = "Hidden";
  const productTemplate = (props: any) => {
      return (<div className="card">
              <img src={props.ImgPath} alt={props.Title} className="card-img-top" style={{ height: "370px", width: "100%" }}/>
              <div className="card-body" style={{ padding: "1rem" }}>
                  <h1 className="card-title">{props.Title}</h1>
                  <p className="card-text">{props.Content}</p>
              </div>
          </div>);
  };
  return (<div className='control-pane'>
          <div className='control-section db-carousel-section'>
              <div className='control carousel-sample'>
                  {/* Render the Carousel Component */}
                  <CarouselComponent cssClass="db-carousel" animationEffect="Fade" dataSource={productDetails} buttonsVisibility={showButtons} itemTemplate={productTemplate}></CarouselComponent>
              </div>
          </div>
      </div>);
};