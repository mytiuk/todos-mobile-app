import { View, Text, StyleSheet, Platform } from "react-native";
import { SIZES, COLORS, SHADOWS, FONTS } from "../styles";

export const Navbar = (props) => {

  return (
    <View style={{...styles.navbar, ...styles.nav}}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: SIZES.small , 
    ...SHADOWS.medium
  },
   
  text: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    fontFamily: FONTS.medium
  },

  nav: {
    backgroundColor: 'rgba(76, 166, 233, 0.7)',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
  }
})