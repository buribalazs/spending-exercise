import React, { useEffect, useState, useRef } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({ onChange }) {

  const [sort, setSort] = useState('-date');
  const [filter, setFilter] = useState('');
  
  function sortInput(e){
    setSort(e.target.value);
  }
  function filterInput(e){
    setFilter(e.target.name);
  };
  
  const firstUpdate = useRef(true);
  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } // prevent mount firing (must be a better way) -Balázs
    onChange({
      sort,
      filter
    })
  },[sort,filter, onChange])

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select value={sort} onChange={sortInput}>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
              onClick={filterInput}
              className={filter==='' ? 'selected' : ''}
              >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
              onClick={filterInput}
              className={filter==='HUF' ? 'selected' : ''}
              >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
              onClick={filterInput}
              className={filter==='USD' ? 'selected' : ''}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
