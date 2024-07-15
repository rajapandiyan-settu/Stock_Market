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
import AllStocks from './components/AllStocks';
import MyStocks from './components/MyStocks';
import StockAnalysis from './components/StockAnalysis';
import GainersLosers from './components/GainersLosers';
import Screener from './components/Screener';
import News from './components/News';
import Announcement from './components/Announcement';
import { StockDetails } from './data';
import './style.css';
export default function App() {
  const [dm, setDm] = useState(
    new DataManager({
      url: 'http://localhost:62869/api/StockData',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'myStocks',
    })
  );
  const [marquee, setMarquee] = useState([
    {
      ID: 1,
      CompanyName: 'Tech Innovators Inc',
      Sector: 'Technology',
      Net: 41.300000000000004,
      Last: 33.5,
      ChangeInValue: -7.800000000000001,
      ChangeInPercent: -0.18886198547215496,
      High: 49.2,
      Low: 33.5,
      Rating: 'Strongly Sell',
      Volume: 20273,
    },
    {
      ID: 11,
      CompanyName: 'Health Solutions LLC',
      Sector: 'Healthcare',
      Net: 46.45,
      Last: 48.650000000000006,
      ChangeInValue: 2.2,
      ChangeInPercent: 0.04736275565123789,
      High: 55.190000000000005,
      Low: 39.160000000000004,
      Rating: 'Buy',
      Volume: 8379,
    },
    {
      ID: 21,
      CompanyName: 'Finance Corp',
      Sector: 'Finance',
      Net: 26.34,
      Last: 29.740000000000002,
      ChangeInValue: 3.4000000000000004,
      ChangeInPercent: 0.12908124525436598,
      High: 34.24,
      Low: 18.54,
      Rating: 'Buy',
      Volume: 15122,
    },
    {
      ID: 31,
      CompanyName: 'Retail Enterprises',
      Sector: 'Retail',
      Net: 45.77,
      Last: 46.470000000000006,
      ChangeInValue: 0.7000000000000001,
      ChangeInPercent: 0.01529386060738475,
      High: 53.67,
      Low: 37.010000000000005,
      Rating: 'Buy',
      Volume: 17028,
    },
    {
      ID: 41,
      CompanyName: 'Manufacturing Co',
      Sector: 'Manufacturing',
      Net: 56.63,
      Last: 64.23,
      ChangeInValue: 7.6000000000000005,
      ChangeInPercent: 0.13420448525516512,
      High: 64.53,
      Low: 47.88,
      Rating: 'Strongly Buy',
      Volume: 20723,
    },
    {
      ID: 51,
      CompanyName: 'Energy Holdings',
      Sector: 'Energy',
      Net: 25.34,
      Last: 30.84,
      ChangeInValue: 5.5,
      ChangeInPercent: 0.2170481452249408,
      High: 33.08,
      Low: 18.55,
      Rating: 'Strongly Buy',
      Volume: 22522,
    },
    {
      ID: 61,
      CompanyName: 'Consumer Goods Group',
      Sector: 'Consumer Goods',
      Net: 55.42,
      Last: 56.120000000000005,
      ChangeInValue: 0.7000000000000001,
      ChangeInPercent: 0.012630819198845183,
      High: 64.15,
      Low: 47.620000000000005,
      Rating: 'Buy',
      Volume: 13952,
    },
    {
      ID: 71,
      CompanyName: 'Telecom Networks',
      Sector: 'Telecommunications',
      Net: 47.43,
      Last: 54.730000000000004,
      ChangeInValue: 7.300000000000001,
      ChangeInPercent: 0.15391102677630195,
      High: 55.03,
      Low: 41.129999999999995,
      Rating: 'Strongly Buy',
      Volume: 14701,
    },
    {
      ID: 81,
      CompanyName: 'Transport Ltd',
      Sector: 'Transportation',
      Net: 44.99,
      Last: 41.39,
      ChangeInValue: -3.6,
      ChangeInPercent: -0.08001778172927317,
      High: 53.730000000000004,
      Low: 35.38,
      Rating: 'Sell',
      Volume: 10988,
    },
  ] as StockDetails[]);

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
                  All Stocks
                </NavLink>
                <NavLink to="/mystocks" className="nav-link">
                  MyStocks
                </NavLink>
                <NavLink to="/stock_analysis" className="nav-link">
                  Stock Analysis
                </NavLink>
                <NavLink to="/gainers_losers" className="nav-link">
                  Gainers/Losers
                </NavLink>
                <NavLink to="/screener" className="nav-link">
                  Screener
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
                  element={<AllStocks changeMarquee={changeMarquee} myStockDm={dm} />}
                />
                <Route path="/mystocks" element={<MyStocks myStockDm={dm} />} />
                <Route path="/stock_analysis" element={<StockAnalysis />} />
                <Route path="/gainers_losers" element={<GainersLosers />} />
                <Route path="/screener" element={<Screener />} />
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
