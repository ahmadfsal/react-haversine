import React from 'react'
import ReactDOM from 'react-dom'
import Main from 'pages'
import { BrowserRouter } from 'react-router-dom'
import { Store } from 'context/store'
import * as serviceWorker from './serviceWorker'
import 'assets/styles/index.scss'

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
