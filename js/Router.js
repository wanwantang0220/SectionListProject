import {StackNavigator} from "react-navigation";
import HomePage from "./HomePage";
import MovieHomePage from "./page/MovieHomePage";


const Router = StackNavigator({
    MovieHome: {
        title: 'Movie',
        screen: MovieHomePage
    },
    Home: {
        title: 'Home',
        screen: HomePage
    }


});


module.exports = Router;
