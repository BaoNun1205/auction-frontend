import React from 'react'
import SearchResults from '~/features/Customer/SearchResult/SearchResult'
import CustomerLayout from '~/layouts/CustomerLayout'

function SearchResultPage() {
  return (
    <CustomerLayout>
      <SearchResults />
    </CustomerLayout>
  )
}

export default SearchResultPage