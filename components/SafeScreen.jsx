import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS_MASTER} from "../constants/colorsMaster";

const SafeScreen = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: COLORS_MASTER.background }}>
      {children}
    </View>
  )
}

export default SafeScreen