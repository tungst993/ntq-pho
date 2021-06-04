import React from 'react';
import { Controller, FieldValues, useFieldArray, UseFormMethods } from 'react-hook-form';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesignicons from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native-animatable';
import { Input } from 'react-native-elements';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../recoil/theme/atoms';
import { mainStyles } from '../../../theme/mainStyles';
import type { ThemeColors } from '../../../types/theme';
import { IconSizes } from '../../../theme/Icon';

interface AddVoteProps {
  setVoteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormMethods<FieldValues>;
}

const AddVote = React.memo<AddVoteProps>(({ setVoteVisible, form }) => {
  const theme = useRecoilValue(themeState);
  const styles = style(theme);

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vote',
  });

  function onHideVote() {
    setVoteVisible(false);
  }

  return (
    <View style={styles.voteWrapper}>
      <View style={{ ...mainStyles.spaceBetween, marginBottom: 16 }}>
        <Text style={styles.title}>Thêm cuộc thăm dò ý kiến</Text>
        <TouchableOpacity style={{ ...styles.closeBtn, width: 40, height: 40, borderRadius: 20 }} onPress={onHideVote}>
          <AntDesignicons name="close" color={theme.text02} size={IconSizes.x6} />
        </TouchableOpacity>
      </View>
      <View style={{ marginRight: 16 }}>
        {fields.map((field, index) => (
          <View key={index} style={styles.itemWrapper}>
            <View style={{ width: '90%' }}>
              <Controller
                control={control}
                name={`vote.${index}.content`}
                render={({ onChange, onBlur, value }) => {
                  return (
                    <Input
                      value={value}
                      defaultValue={field.value}
                      placeholder={`Lựa chọn ${index + 1}`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      inputStyle={{ color: theme.text01, fontSize: 14 }}
                    />
                  );
                }}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => remove(index)}>
                <AntDesignicons name="close" color={theme.text02} size={IconSizes.x4} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addNewVoteBtn} onPress={() => append({ test: 'test' })}>
        <AntDesignicons name="plus" color={theme.text02} size={IconSizes.x4} />
        <Text style={{ ...styles.text, marginLeft: 8, fontSize: 16 }}>Thêm lựa chọn</Text>
      </TouchableOpacity>
    </View>
  );
});

const style = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    text: {
      color: theme.text01,
    },
    voteWrapper: {
      borderColor: theme.divider,
      borderWidth: 2,
      marginVertical: 12,
      marginHorizontal: 20,
      padding: 12,
    },
    title: {
      fontSize: 18,
      color: theme.text01,
      marginBottom: 12,
    },
    addNewVoteBtn: {
      padding: 12,
      backgroundColor: theme.base,
      borderRadius: 5,
      width: responsiveWidth(60),
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeBtn: {
      backgroundColor: theme.base,
      width: 32,
      height: 32,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });

export default AddVote;
