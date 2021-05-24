import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ThemeStatic } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../../assets1/icons';
import Background from '../../../components/Background';

interface UpdateInfoProps {
  list: Array<string>;
  onComplete: (value: string) => void;
}

const UpdateInfo = React.memo<UpdateInfoProps>(({ list, onComplete }) => {
  const [itemSelected, setItemSeleted] = useState<any>('');

  function onSelectedDepartment(itemSelected: string) {
    setItemSeleted(itemSelected);
  }

  return (
    <Background>
      <View style={styles.logoWrapper}>
        <Image source={Images.ntqLogo} />
      </View>
      <View>
        <Text style={styles.title}>Chọn đơn vị bạn đang làm việc?</Text>
      </View>
      <View style={styles.itemWrapper}>
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <LinearGradient
              colors={item === itemSelected ? ['#4c669f', '#3b5998', '#192f6a'] : ['white', 'white']}
              style={styles.itemView}
              onTouchStart={() => onSelectedDepartment(item)}>
              <Text
                style={
                  item === itemSelected
                    ? { color: 'white', fontWeight: 'bold' }
                    : { color: ThemeStatic.accent, fontWeight: 'bold' }
                }>
                {item}
              </Text>
            </LinearGradient>
          </React.Fragment>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonConfirm} onPress={() => onComplete(itemSelected)}>
        <Text style={{ color: ThemeStatic.accent, fontSize: 18, fontWeight: 'bold' }}>Tiếp tục</Text>
      </TouchableOpacity>
    </Background>
  );
});

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 90,
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: (responsiveWidth(20) - 40) / 2,
    width: responsiveWidth(100),
    // paddingBottom: responsiveHeight(5),
  },
  itemView: {
    width: responsiveWidth(20),
    alignItems: 'center',
    height: responsiveWidth(10),
    borderColor: ThemeStatic.accent,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 30,
    borderRadius: responsiveWidth(10),
  },
  title: {
    color: ThemeStatic.white,
    fontSize: 30,
    paddingHorizontal: (responsiveWidth(20) - 40) / 2,
    textAlign: 'center',
    lineHeight: 50,
  },
  buttonConfirm: {
    height: 48,
    backgroundColor: ThemeStatic.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: responsiveWidth(90),
  },
});

export default UpdateInfo;
