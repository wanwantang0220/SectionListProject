
import { StackNavigator } from "react-navigation";
import HomePage from "./HomePage";



const Router =  StackNavigator({
    Home:{
      title:'Home',
      screen:HomePage
    }


});


module.exports = Router;
