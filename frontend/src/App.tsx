import {Header} from "./components/header/Header";
import {LocationList} from "./components/locationList/LocationList";
import {Footer} from "./components/footer/Footer";
import './App.css';

function App() {
    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            <Header/>
            <main className="flex-1 flex flex-col">
                <LocationList/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;