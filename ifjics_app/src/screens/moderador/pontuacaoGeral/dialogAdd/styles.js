const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  item: {
    margin: deviceHeight / 80,
    marginLeft: 0,
    marginRight: 0,
  },
};