import { createContext, useContext } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const PortfolioContext = createContext(PORTFOLIO_DATA);

export const usePortfolio = () => useContext(PortfolioContext);
