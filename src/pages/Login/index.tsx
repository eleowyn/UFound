import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/molecules/header';
import {Button, Gap} from '../../components';
import Logologin from '../../assets/Loginlogo.svg';
import TextInput from '../../components/atoms/textInput';
import Checkbox from '../../components/atoms/Checkbox';
import BottomTabs from '../../components/molecules/Tabs';
import Loading from '../../components/molecules/Loading';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showMessage({
        message: 'Login successfull!',
        type: 'success',
      });
      navigation.replace('Dashboard');
    }, 3000);
  };

  return (
    <>
      <View style={styles.pageContainer}>
        <Header title="Welcome back!" subTitle="Glad to have you here again" />
        <Logologin width={210} height={210} style={styles.loginPic} />
        <View style={styles.contentContainer}>
          <Gap height={2} />
          <TextInput
            text="Email Address"
            placeholder="Enter your email address"
          />
          <Gap height={16} />
          <TextInput text="Password" placeholder="Enter your password" />
          <Checkbox label="Remember me" />
          <Text style={styles.forgotLabel}>Forgot Password?</Text>
          <Gap height={10} />
          <Button text="Log In" onPress={handleLogin} />
          <Gap height={12} />
          <View style={styles.signupWrapper}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 24,
    marginHorizontal: 24,
  },
  loginPic: {
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
