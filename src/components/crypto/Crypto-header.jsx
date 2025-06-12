import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";

export const CryptoHeader = ({
  symbol,
  name,
  price,
  change
}) => {
  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return price.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
  };

  return (
    <Card className="mb-6 bg-surface-alt rounded-xl border border-brand">
      <CardBody className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-base leading-7">
              {symbol}
            </h2>
            <p className="text-muted text-sm leading-5">
              {name}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-2xl md:text-3xl font-bold text-base leading-8">
              {formatPrice(price)}
            </div>
            
            <Chip 
              className={`mt-1 ${change >= 0 ? 'bg-success' : 'bg-danger'} text-base`}
              variant="flat"
            >
              {change >= 0 ? "+" : ""}{change.toFixed(2)}%
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CryptoHeader;