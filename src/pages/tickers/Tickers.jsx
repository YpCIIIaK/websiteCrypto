import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import CryptoHeader from '../../components/crypto/Crypto-header';
import MainChart from '../../components/crypto/Main-chart';
import MiniCharts from '../../components/crypto/Mini-charts';
import SpreadIndicator from '../../components/crypto/Spread-indicator';
import CryptoDescription from '../../components/crypto/Crypto-description';
import CryptoSearch from '../../components/crypto/Crypto-search';
import { useCryptoData } from '../../components/hooks/use-crypto-data';

import "./Tickers.css";

const Tickers = () => {

const { 
    searchQuery, 
    setSearchQuery, 
    selectedPair,
    setSelectedPair,
    searchResults,
    isLoading,
    cryptoData
  } = useCryptoData();
    

    return (
        <div className="tickers-page min-h-screen bg-surface text-base p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-6 text-brand">
                  <Icon icon="lucide:bar-chart-2" className="text-accent" width={28} height={28} />
                  Crypto Ticker Dashboard
                </h1>
                
                <CryptoSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchResults={searchResults}
                  isLoading={isLoading}
                  onSelectPair={setSelectedPair}
                />
              </header>
      
              {selectedPair ? (
                <>
                  <CryptoHeader 
                    symbol={selectedPair.symbol} 
                    name={selectedPair.name} 
                    price={cryptoData.price}
                    change={cryptoData.change}
                  />
                  
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-surface-alt">
                      <CardBody>
                        <MainChart data={cryptoData.mainChartData} />
                      </CardBody>
                    </Card>
                    
                    <MiniCharts 
                      highLowData={cryptoData.highLowData}
                      sentimentData={cryptoData.sentimentData}
                      volumeHeatmapData={cryptoData.volumeHeatmapData}
                    />
                    
                    <SpreadIndicator 
                      symbol={selectedPair.symbol}
                      exchangeData={cryptoData.exchangeData}
                    />
                    
                    <CryptoDescription 
                      symbol={selectedPair.symbol}
                      description={cryptoData.description}
                      marketCap={cryptoData.marketCap}
                      volume24h={cryptoData.volume24h}
                      circulatingSupply={cryptoData.circulatingSupply}
                      allTimeHigh={cryptoData.allTimeHigh}
                    />
                  </div>
                </>
              ) : (
                <Card className="bg-surface-alt">
                  <CardBody className="flex flex-col items-center justify-center py-16">
                    <Icon icon="lucide:search" className="text-accent mb-4" width={48} height={48} />
                    <p className="text-muted text-lg">Search for a cryptocurrency pair to view charts and data</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
    );
};

export default Tickers;