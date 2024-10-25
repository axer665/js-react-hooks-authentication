import AuthProvider from './components/AuthProvider/AuthProvider';
import Header from './components/Header/Header';
import News from './components/News/News';

function App() {
    return (
        <AuthProvider>
            <div className="app">
                <Header />
                <News />
            </div>
        </AuthProvider>
    )
}

export default App;