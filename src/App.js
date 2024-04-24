import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct';
import LoginForm from './Components/Login';
import GraphForm from './Components/GraphForm';
import LineChart from './Components/ChartLine';


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 style={{color:'aliceblue'}}>React Query App</h1>
        <ProductList />  
      </div>
    </QueryClientProvider>
    // // <LoginForm/>
    // <>  <GraphForm/>
    // <LineChart/></>
   
  );
};

export default App;
