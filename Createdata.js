// Createdata.js
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import styles from './styles/CreatedataStyles';
import { database } from './config/FirebaseAPI'; // Import the database instance
import { ref, push, set } from 'firebase/database'; 

export default function CreateData({
  isModalVisible,
  setModalVisible,
  coordinates,
}) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

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

    const dbRef = ref(database, "mahasiswa"); // 'students' is the node in the database
    const newEntryRef = push(dbRef); // Generate a unique key

    set(newEntryRef, data)
      .then(() => {
        alert("Data tersimpan");
        setFirstName("");
        setLastName("");
        setAddress("");
        setGender("");
        setEmail("");
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Data gagal tersimpan");
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
            <Text style={styles.formTitle}>Tambah Data Kos</Text>

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
}
