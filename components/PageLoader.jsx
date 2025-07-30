import { View, ActivityIndicator } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Colors } from "../constants/colors";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
export default PageLoader;