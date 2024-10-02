import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { userAccountApi } from './services/api\'s/common/userAccountApi.js'
import { Provider } from 'react-redux'
import { store } from './services/store/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

let persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={userAccountApi}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
          <App />
          </PersistGate>
        </Provider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
