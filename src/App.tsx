import * as React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import {
  DataManager,
  UrlAdaptor,
} from '@syncfusion/ej2-data';
import Overview from './components/Overview';
import MyPortfolio from './components/MyPortfolio';
import StockAnalysis from './components/StockAnalysis';
import ClimbersFallers from './components/ClimbersFallers';
import SmartStockPicks from './components/SmartStockPicks';
import News from './components/News';
import Announcement from './components/Announcement';
import { StockDetails, marqueeData } from './data';
import './style.css';
export default function App() {
  const [dm, setDm] = useState(
    new DataManager({
      // url: 'https://ej2services.syncfusion.com/aspnet/development/api/StockData',
      url: 'http://localhost:62869/api/StockData',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'myStocks',
    })
  );
  const [marquee, setMarquee] = useState(marqueeData);
  const changeMarquee = (data: StockDetails[]) => {
    setMarquee(data);
  };
  return (
    <div>
      <div className="marquee-container">
        <div className="marquee">
          {marquee.map((item, index) => (
            <span
              className={
                item.ChangeInValue > 0 ? 'company posvalue' : 'company negvalue'
              }
              key={index}
            >
              {item.CompanyName}
              <span className="value">{item.ChangeInValue.toFixed(2)}</span>
              <span
                className={
                  item.ChangeInValue > 0 ? 'e-icons pos' : 'e-icons neg'
                }
              ></span>
            </span>
          ))}
        </div>
      </div>

      <Router>
        <div className="">
          <div className="">
            <div className="">
              <nav className="nav">
                <NavLink to="/" className="nav-link">
                  Overview
                </NavLink>
                <NavLink to="/my_portfolio" className="nav-link">
                  My Portfolio
                </NavLink>
                <NavLink to="/smart_stock_picks" className="nav-link">
                  Smart Stock Picks
                </NavLink>
                <NavLink to="/stock_analysis" className="nav-link">
                  Stock Analysis
                </NavLink>
                <NavLink to="/climbers_fallers" className="nav-link">
                Climbers/Fallers
                </NavLink>
                <NavLink to="/trending_news" className="nav-link">
                  Trending News
                </NavLink>
                <NavLink to="/announcement" className="nav-link">
                  Announcement
                </NavLink>
              </nav>
            </div>
            <div className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={<Overview changeMarquee={changeMarquee} myStockDm={dm} />}
                />
                <Route path="/my_portfolio" element={<MyPortfolio changeMarquee={changeMarquee} myStockDm={dm} />} />
                <Route path="/stock_analysis" element={<StockAnalysis />} />
                <Route path="/climbers_fallers" element={<ClimbersFallers />} />
                <Route path="/smart_stock_picks" element={<SmartStockPicks />} />
                <Route path="/trending_news" element={<News />} />
                <Route path="/announcement" element={<Announcement />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
