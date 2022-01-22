import Animated from "react-native-reanimated";
import { FlatList } from "react-native";
import { withScreenScroll } from "./withScreenScroll";

export const ScreenFlatList = withScreenScroll(Animated.createAnimatedComponent(FlatList));