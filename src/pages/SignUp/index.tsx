import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import Logosignup from '../../assets/signup_pic';

import {
  Header,
  Button,
  Gap,
  textInput as TextInput,
  Checkbox,
  Loading,
} from '../../components/index';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !agree) {
      showMessage({
        message: 'Please complete all fields and agree to the terms!',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showMessage({
        message: 'Account created successfully!',
        type: 'success',
      });
      navigation.replace('Login');
    }, 2000);
  };

  return (
    <>
      <View style={styles.pageContainer}>
        <Header
          title="Let's Get Started!"
          subTitle="Fill the form to continue"
        />
        <Logosignup width={210} height={210} style={styles.signupPic} />
        <View style={styles.contentContainer}>
          <Gap height={2} />
          <TextInput
            text="Your Email Address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
          <Gap height={16} />
          <TextInput
            text="Create a Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
          <Gap height={10} />
          <Checkbox
            label="I agree with terms of use"
            value={agree}
            onValueChange={setAgree}
          />
          <Gap height={20} />
          <Button text="Sign Up" onPress={handleSignUp} />
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
      {loading && <Loading />}
    </>
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
    fontSize: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
