import {StackNavigator} from "react-navigation";
import HomePage from "./HomePage";
import MovieHomePage from "./page/MovieHomePage";
import SingerDetailPage from "./page/SingerDetailPage";


const Router = StackNavigator({
    MovieHome: {
        title: 'Movie',
        screen: MovieHomePage
    },
    Home: {
        title: 'Home',
        screen: HomePage
    },
    SingerDetail:{
        title: 'SingerDetail',
        screen: SingerDetailPage
    }


});


module.exports = Router;
