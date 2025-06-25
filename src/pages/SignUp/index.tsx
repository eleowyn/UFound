import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/header';
import {Button, Gap} from '../../components';
import Logosignup from '../../assets/signup_pic';
import TextInput from '../../components/atoms/textInput';
import Checkbox from '../../components/atoms/Checkbox';

const SignUp = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <Header title="Let's Get Started!" subTitle="Fill the form to continue" />
      <Logosignup width={210} height={210} style={styles.signupPic} />
      <View style={styles.contentContainer}>
        <Gap height={2} />
        <TextInput
          text="Your Email Address"
          placeholder="Enter your email address"
        />
        <Gap height={16} />
        <TextInput text="Create a Password" placeholder="Enter your password" />
        <Checkbox label="I agree with terms of use" />
        <Gap height={10} />
        <Button text="Sign Up" onPress={() => navigation.replace('Login')} />
        <Gap height={12} />
        <View style={styles.signupWrapper}>
          <Text style={styles.signupText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.signupLink}>Log In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 24,
    marginHorizontal: 24,
  },
  signupPic: {
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  checkbox: {
    marginLeft: 13,
  },
  forgotLabel: {
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
    color: '#6D6D6D',
    fontSize: 11,
  },
  signupWrapper: {
    alignItems: 'center',
    marginTop: 12,
  },
  signupText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  signupLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});
