import { ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { withScreenScroll } from "./withScreenScroll";

export const ScreenScrollView = withScreenScroll(Animated.createAnimatedComponent(ScrollView));