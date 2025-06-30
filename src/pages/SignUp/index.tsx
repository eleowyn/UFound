// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// import {showMessage} from 'react-native-flash-message';
// import Logosignup from '../../assets/signup_pic';

// import {
//   Header,
//   Button,
//   Gap,
//   textInput as TextInput,
//   Checkbox,
//   Loading,
// } from '../../components/index';

// const SignUp = ({navigation}) => {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [agree, setAgree] = useState(false);

//   const handleSignUp = () => {
//     if (!email || !password || !agree) {
//       showMessage({
//         message: 'Please complete all fields and agree to the terms!',
//         type: 'danger',
//       });
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       showMessage({
//         message: 'Account created successfully!',
//         type: 'success',
//       });
//       navigation.replace('Login');
//     }, 2000);
//   };

//   return (
//     <>
//       <View style={styles.pageContainer}>
//         <Header
//           title="Let's Get Started!"
//           subTitle="Fill the form to continue"
//         />
//         <Logosignup width={210} height={210} style={styles.signupPic} />
//         <View style={styles.contentContainer}>
//           <Gap height={2} />
//           <TextInput
//             text="Your Email Address"
//             placeholder="Enter your email address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <Gap height={16} />
//           <TextInput
//             text="Create a Password"
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//           />
//           <Gap height={10} />
//           <Checkbox
//             label="I agree with terms of use"
//             value={agree}
//             onValueChange={setAgree}
//           />
//           <Gap height={20} />
//           <Button text="Sign Up" onPress={handleSignUp} />
//           <Gap height={12} />
//           <View style={styles.signupWrapper}>
//             <Text style={styles.signupText}>
//               Already have an account?{' '}
//               <TouchableOpacity onPress={() => navigation.replace('Login')}>
//                 <Text style={styles.signupLink}>Log In</Text>
//               </TouchableOpacity>
//             </Text>
//           </View>
//         </View>
//       </View>
//       {loading && <Loading />}
//     </>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     marginTop: 24,
//     marginHorizontal: 24,
//   },
//   signupPic: {
//     alignSelf: 'center',
//     marginTop: 2,
//     marginBottom: 12,
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
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import Logosignup from '../../assets/signup_pic';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

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
  const [nama, setNama] = useState('');
  const [fakultas, setFakultas] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSignUp = async () => {
    if (
      !email ||
      !password ||
      !nama ||
      !fakultas ||
      !jurusan ||
      !studentId ||
      !phoneNumber
    ) {
      showMessage({
        message: 'Please complete all fields!',
        type: 'danger',
      });
      return;
    }

    if (!agree) {
      showMessage({
        message: 'You must agree to the terms of use!',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    const auth = getAuth();
    const db = getDatabase();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), {
        nama: nama,
        email: email,
        faculty: fakultas,
        jurusan: jurusan,
        studentId: studentId,
        phone: phoneNumber,
        createdAt: new Date().toISOString(),
      });

      showMessage({
        message: 'Account created successfully!',
        type: 'success',
      });

      navigation.replace('Login', {email: email});
    } catch (error) {
      let errorMessage = 'Registration failed';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message;
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
      <ScrollView style={styles.pageContainer}>
        <Header
          title="Let's Get Started!"
          subTitle="Fill the form to continue"
        />
        <Logosignup width={210} height={210} style={styles.signupPic} />
        <View style={styles.contentContainer}>
          <Gap height={2} />
          <TextInput
            text="Your Full Name"
            placeholder="Enter your full name"
            value={nama}
            onChangeText={setNama}
          />
          <Gap height={16} />
          <TextInput
            text="Your Email Address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Gap height={16} />
          <TextInput
            text="Create a Password"
            placeholder="Enter your password (min. 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Gap height={16} />
          <TextInput
            text="Faculty"
            placeholder="Enter your faculty"
            value={fakultas}
            onChangeText={setFakultas}
          />
          <Gap height={16} />
          <TextInput
            text="Major"
            placeholder="Enter your major"
            value={jurusan}
            onChangeText={setJurusan}
          />
          <Gap height={16} />
          <TextInput
            text="Student ID"
            placeholder="Enter your student ID"
            value={studentId}
            onChangeText={setStudentId}
          />
          <Gap height={16} />
          <TextInput
            text="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
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
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginBottom: 50,
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
