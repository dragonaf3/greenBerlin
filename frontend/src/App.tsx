import {Header} from "./components/header/Header";
import {LocationList} from "./components/locationList/LocationList";
import {Footer} from "./components/footer/Footer";
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Header/>
            <main className="app-content">
                <LocationList/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;