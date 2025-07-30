import { View, ActivityIndicator } from "react-native";
import { styles } from "../assets/styles/home.styles";
import {COLORS_MASTER} from "../constants/colorsMaster";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS_MASTER.primary} />
    </View>
  );
};
export default PageLoader;