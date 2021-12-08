
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import '../styles/firebaseui-styling.global.css';

function MyApp({ Component, pageProps, err }) {
    return <Component {...pageProps} err={err}/>
}

export default MyApp
