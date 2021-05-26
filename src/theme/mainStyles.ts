import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

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
    justifyContent: 'center',
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
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
