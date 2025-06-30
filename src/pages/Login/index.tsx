// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// import {showMessage} from 'react-native-flash-message';
// import Logologin from '../../assets/Loginlogo.svg';

// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

// import {
//   Header,
//   Button,
//   Gap,
//   textInput as TextInput,
//   Checkbox,
//   Loading,
// } from '../../components/index';

// const Login = ({navigation}) => {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleLogin = () => {
//     if (!email || !password) {
//       showMessage({
//         message: 'Please enter your email and password!',
//         type: 'danger',
//       });
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       showMessage({
//         message: rememberMe
//           ? 'Login successful! (Remembered ✅)'
//           : 'Login successful!',
//         type: 'success',
//       });

//       // 🧠 Kalau mau simpan status "remember me" ke storage, bisa pakai AsyncStorage di sini

//       navigation.replace('Dashboard');
//     }, 2000);
//   };

//   return (
//     <>
//       <View style={styles.pageContainer}>
//         <Header title="Welcome back!" subTitle="Glad to have you here again" />
//         <Logologin width={210} height={210} style={styles.loginPic} />
//         <View style={styles.contentContainer}>
//           <Gap height={2} />
//           <TextInput
//             text="Email Address"
//             placeholder="Enter your email address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <Gap height={16} />
//           <TextInput
//             text="Password"
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//           />
//           <Checkbox
//             label="Remember me"
//             value={rememberMe}
//             onValueChange={setRememberMe}
//           />
//           <Text style={styles.forgotLabel}>Forgot Password?</Text>
//           <Gap height={10} />
//           <Button text="Log In" onPress={handleLogin} />
//           <Gap height={12} />
//           <View style={styles.signupWrapper}>
//             <Text style={styles.signupText}>
//               Don't have an account?{' '}
//               <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
//                 <Text style={styles.signupLink}>Sign Up</Text>
//               </TouchableOpacity>
//             </Text>
//           </View>
//         </View>
//       </View>
//       {loading && <Loading />}
//     </>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     marginTop: 24,
//     marginHorizontal: 24,
//   },
//   loginPic: {
//     alignSelf: 'center',
//     marginTop: 2,
//     marginBottom: 12,
//   },
//   checkbox: {
//     marginLeft: 13,
//   },
//   forgotLabel: {
//     textAlign: 'right',
//     fontFamily: 'Poppins-Medium',
//     color: '#6D6D6D',
//     fontSize: 11,
//   },
//   signupWrapper: {
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   signupText: {
//     fontSize: 11,
//     fontFamily: 'Poppins-Regular',
//     color: '#808080',
//   },
//   signupLink: {
//     fontFamily: 'Poppins-SemiBold',
//     color: '#000',
//     fontSize: 11,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import Logologin from '../../assets/Loginlogo.svg';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {
  Header,
  Button,
  Gap,
  textInput as TextInput,
  Checkbox,
  Loading,
} from '../../components/index';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        message: 'Please enter your email and password!',
        type: 'danger',
      });
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      showMessage({
        message: rememberMe
          ? 'Login successful! (Remembered ✅)'
          : 'Login successful!',
        type: 'success',
      });

      // If you want to implement remember me functionality,
      // you can store the credentials here using AsyncStorage

      navigation.replace('Dashboard');
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
      }

      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Gap height={16} />
          <TextInput
            text="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Checkbox
            label="Remember me"
            value={rememberMe}
            onValueChange={setRememberMe}
          />
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
    fontSize: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
