import HomeScreen from './HomeScreen';
import AuthScreen from './../../Authentication/AuthScreen';
const HomePage = () => {

    const user = false
    return (
        <>
            <div>
                {user ? <HomeScreen /> : <AuthScreen />}
            </div>
        </>
    )
}

export default HomePage