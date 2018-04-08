
import { StackNavigator } from "react-navigation";
import HomePage from "./HomePage";
import MoviePage from "./page/MoviePage";



const Router =  StackNavigator({
    Home:{
      title:'Home',
      screen:HomePage
    },
    Movie:{
        title:'Movie',
        screen:MoviePage
    }


});


module.exports = Router;
