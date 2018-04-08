import {TabNavigator} from "react-navigation";
import MainPage from "./page/MainPage";
import MePage from "./page/MePage";

const HomePage = TabNavigator({
    Main: {
        screen: MainPage,
        navigationOptions: {
            title:"首页"
        }
    },
    Me: {
        screen: MePage,
        navigationOptions: {
            title:"我的"
        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否左右滑动,如果有DrawerNavigator,最好设置为false避免手势冲突
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        // activeTintColor: '#0F9C00', // 文字和图片选中颜色
        // inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            // backgroundColor: '#444', // TabBar 背景色
            height: 50
        },
        labelStyle: {
            fontSize: 16, // 文字大小,
            marginTop: 5,
        },
    },
});

module.exports = HomePage;