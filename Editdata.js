import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import styles from './styles/EditdataStyles';
import { database } from './config/FirebaseAPI'; // For Realtime Database
import { ref, update } from 'firebase/database'; // Firebase Realtime Database methods


const EditData = ({
  isModalVisible,
  setModalVisible,
  coordinates,
  selectedUser,
  setSelectedUser,
  onSave,
}) => {

  // Initialize state with selected user data or empty strings if no data
  const [first_name, setFirstName] = useState(selectedUser?.first_name || '');
  const [last_name, setLastName] = useState(selectedUser?.last_name || '');
  const [address, setAddress] = useState(selectedUser?.address || '');
  const [gender, setGender] = useState(selectedUser?.gender || '');
  const [email, setEmail] = useState(selectedUser?.email || '');

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.first_name);
      setLastName(selectedUser.last_name);
      setAddress(selectedUser.address);
      setGender(selectedUser.gender);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]); // This effect runs when selectedUser  changes

  const submit = () => {
    const data = {
      first_name,
      last_name,
      address,
      gender,
      email,
      longitude: coordinates[0],
      latitude: coordinates[1],
    };

     // Update the specific user's data in the Firebase database
     const userRef = ref(database, `mahasiswa/${selectedUser.id}`);
     
      update(userRef, data)
      .then(() => {
        alert('Data berhasil disimpan');

        // Reset the form data
        setFirstName('');
        setLastName('');
        setAddress('');
        setGender('');
        setEmail('');

        // Close the modal and reset the selectedUser
        setModalVisible(false);
        setSelectedUser(null);

        // Optionally call the onSave callback for parent updates
        if (onSave) onSave(data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        alert('Gagal menyimpan data.');
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.formTitle}>Edit Data Kos</Text>

            
            <TextInput
              style={styles.input}
              placeholder="Nama depan"
              value={first_name}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama belakang"
              value={last_name}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Alamat lengkap"
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Laki-laki' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('Laki-laki')}>
                <Text
                  style={[
                    styles.genderText,
                    gender === 'Laki-laki' && styles.genderTextActive,
                  ]}>
                  Laki-laki
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Perempuan' && styles.genderButtonActive,
                ]}
                onPress={() => setGender('Perempuan')}>
                <Text
                  style={[
                    styles.genderText,
                    gender === 'Perempuan' && styles.genderTextActive,
                  ]}>
                  Perempuan
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Longitude"
              value={coordinates ? coordinates[0].toString() : ''}
              editable={false}
            />
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Latitude"
              value={coordinates ? coordinates[1].toString() : ''}
              editable={false}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submit}>
              <Text style={styles.submitButtonText}>Simpan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditData;
