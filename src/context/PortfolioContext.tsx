import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { fetchSanityPortfolioData } from '../sanity/client';

const PortfolioContext = createContext(PORTFOLIO_DATA);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(PORTFOLIO_DATA);

  useEffect(() => {
    fetchSanityPortfolioData().then((sanityData) => {
      if (sanityData) {
        setData(sanityData as any);
      }
    });
  }, []);

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
