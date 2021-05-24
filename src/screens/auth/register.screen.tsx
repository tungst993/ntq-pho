import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ThemeStatic } from '../../theme';
import UpdateInfo from './components/UpdateInfo';

const UpdateDepartment = React.memo(() => {
  const listDepartment = ['OS8', 'OS1', 'OS3', 'OS10', 'IC', 'BOM', 'RECO', 'EZD', '2B', 'ZORO'];
  return (
    <UpdateInfo>
      <View style={styles.itemWrapper}>
        {listDepartment.map((item, index) => (
          <View style={styles.itemView}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{item}</Text>
          </View>
        ))}
      </View>
    </UpdateInfo>
  );
});

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: (responsiveWidth(20) - 40) / 2,
    width: responsiveWidth(100),
    paddingBottom: responsiveHeight(30),
  },
  itemView: {
    width: responsiveWidth(20),
    alignItems: 'center',
    height: responsiveWidth(10),
    borderColor: ThemeStatic.white,
    backgroundColor: ThemeStatic.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 30,
    borderRadius: responsiveWidth(10),
  },
});

export default UpdateDepartment;
