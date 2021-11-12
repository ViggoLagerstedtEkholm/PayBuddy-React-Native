import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      width: "100%",
      paddingStart: 10,
      paddingEnd: 10,
    },
    swipeList:{
      backgroundColor: '#121212',
    },
    backTextWhite: {
      color: '#FFF',
    },
    rowFront: {
      backgroundColor: '#2e82b0',
      borderRadius: 5,
      height: 60,
      margin: 10,
      marginBottom: 20,
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      margin: 5,
      marginBottom: 5,
      borderRadius: 5,
    },
    backRightBtn: {
      alignItems: 'flex-end',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      paddingRight: 17,
    },
    backRightBtnLeft: {
      backgroundColor: '#1f65ff',
      right: 75,
    },
    backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    trash: {
      height: 25,
      width: 25,
      marginRight: 7,
    }
});
