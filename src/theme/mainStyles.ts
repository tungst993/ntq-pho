import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { MaterialColors } from './Colors';

export const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  viewWrapper: {
    paddingHorizontal: 20,
    // backgroundColor: 'white',
    // borderTopColor: MaterialColors.grey[500],
    // borderTopWidth: 0.5,
  },
  input: {
    height: 40,
    width: responsiveWidth(80),
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'gray',
    justifyContent: 'center',
  },
});
