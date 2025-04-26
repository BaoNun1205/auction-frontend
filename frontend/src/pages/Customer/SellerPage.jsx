import React from 'react';
import { useParams } from 'react-router-dom';
import SellerAuction from '~/features/Customer/SellerAuction';
import CustomerLayout from '~/layouts/CustomerLayout';

function SellerPage() {
  const { id: vendorId } = useParams();

  if (!vendorId) {
    return <div>Đang tải...</div>;
  }

  return (
    <CustomerLayout isCategory={false}>
      <SellerAuction vendorId={vendorId} />
    </CustomerLayout>
  );
}

export default SellerPage;
