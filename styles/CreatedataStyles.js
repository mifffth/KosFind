import {StyleSheet} from 'react-native';

const CreatedataStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginVertical: 8,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#4CAF50',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderTextActive: {
    color: '#fff',
  },
  submitButton: {
    padding: 12,
    backgroundColor: '#dd3e3e',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 1, // Menambahkan garis tepi
    borderColor: '#cccccc', // Warna garis tepi (bisa diubah sesuai kebutuhan)
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default CreatedataStyles;
