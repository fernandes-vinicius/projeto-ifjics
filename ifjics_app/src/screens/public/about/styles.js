import { commonColor } from "../../../theme";

const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  logoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    width: null,
    height: null,
    alignItems: 'center',
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100,
  },
  container: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: deviceHeight / 4,
  },
  welcome: {
    fontSize: 12,
    color: '#000',
    opacity: .54,
  },
  textMuted: {
    color: '#000',
    opacity: .54,
  },
};