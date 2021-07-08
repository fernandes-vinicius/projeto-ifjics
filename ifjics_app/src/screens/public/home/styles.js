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
    // marginTop: 30,
    left: Platform.OS === "android" ? 4 : 8,
    top: Platform.OS === "android" ? 30 : 60,
    flex: 1,


  },
  viewText: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    bottom: Platform.OS === "android" ? 10 : 20,
  },
  viewCard: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
  },
  view: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    margin: 30,
    marginTop: 20,
    marginRight: 10,
    paddingTop: 50,
    backgroundColor: '#FFF',
    textColor: 'grey',
    textFont: 38,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,

  },
  cardItem: {
    backgroundColor: commonColor.sixth,
    width: 160,
    height: 180,

    fontSize: 38,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
};
