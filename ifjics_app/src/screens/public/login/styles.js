import { commonColor } from "../../../theme";

const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1, 
    alignItems: 'center',
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100,
  },
  form: {
    margin: deviceHeight / 80,
  },
  h1: {
    color: commonColor.tint,
    fontWeight: 'bold',
  },
  item: {
    margin: deviceHeight / 80,
    marginLeft: 0,
    marginRight: 0,
  },
  btn: {
    marginTop: deviceHeight / 80,
    backgroundColor: commonColor.primary,
  },
  link: {
    color: commonColor.tint,
    fontSize: 10,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
};