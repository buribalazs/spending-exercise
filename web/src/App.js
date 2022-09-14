import React, { useState, useEffect, useCallback } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import { getSpendings, postSpending } from './api';


export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({ sort: '-date', filter: ''});

  function loadSpendings(){
    setLoading(true);
    getSpendings(filters) // better name for "filters"? it contains sorting too -Balázs
      .then((response) => {
        if (response.status === 200) { // why not check before res.json()? Lets discuss (permission?) -Balázs
          setSpendings(response.spendings);
        }
      })
      .catch(err => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(loadSpendings, [filters]);


  const handleFilterChange = useCallback((changedFilters) => {
    setFilters(changedFilters);
  },[])


  function handleFormSubmit(data, formResetFn){
    setLoading(true);
    return postSpending(data)
    .then(response=>{
      if(response.status === 200) {
        loadSpendings();
        formResetFn();
      }
    })
    .catch(err => {
      setError(true);
      setLoading(false);
    })
  }


  return (
    <>
      <Layout>
        <Form onSubmit={handleFormSubmit}/>
        <FiltersAndOrderings
         onChange={handleFilterChange}
        />
        <SpendingList
          spendings={spendings}
          loading={loading}
          error={error}
        />
      </Layout>
    </>
  );
}
