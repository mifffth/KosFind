import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faTrash,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react';
import {database} from './config/FirebaseAPI';
import {ref as sRef, remove, onValue} from 'firebase/database';
import {ToastAndroid} from 'react-native';
import styles from './styles/ListdataStyles';

const Listdata = ({setMarkers, onShowMarker, navigateToMap}) => {
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  const fetchData = () => {
    setLoading(true);
    const dbRef = sRef(database, 'mahasiswa');
    onValue(
      dbRef,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            first_name: data[key].first_name || 'Unknown',
            last_name: data[key].last_name || '',
            address: data[key].address || 'N/A',
            gender: data[key].gender || 'N/A',
            latitude: data[key].latitude || 0,
            longitude: data[key].longitude || 0,
            email: data[key].email || 'N/A',
          }));
          setDataUser(formattedData);
          setFilteredData(formattedData);
          setMarkers(
            formattedData.map(item => ({
              id: item.id,
              latitude: item.latitude,
              longitude: item.longitude,
            })),
          );
        } else {
          setDataUser([]);
          setFilteredData([]);
        }
        setLoading(false);
      },
      {onlyOnce: false},
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const deleteData = id => {
    try {
      const itemRef = sRef(database, `mahasiswa/${id}`);
      remove(itemRef)
        .then(() => {
          ToastAndroid.show('Data deleted', ToastAndroid.SHORT);
        })
        .catch(err => {
          console.error('Error during data deletion:', err);
          ToastAndroid.show('Failed to delete data', ToastAndroid.SHORT);
        });
    } catch (err) {
      console.error('Error in deleteData:', err);
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filtered = dataUser.filter(item =>
        `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dataUser); // If search is empty, show all data
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari berdasarkan nama..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      
      <FlatList
        data={filteredData} // Use filtered data here
        onRefresh={refreshPage}
        refreshing={refresh}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'google.navigation:q=' + item.latitude + ',' + item.longitude,
                )
              }>
              <View style={styles.card}>
                <View style={styles.avatar}>
                  <FontAwesomeIcon
                    icon={faUser}
                    size={50}
                    color={item.gender === 'Laki-laki' ? '#58c7ff' : 'pink'}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.cardTitle}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text>{item.address}</Text>
                  <Text>{item.gender}</Text>
                  <Text>{item.email}</Text>
                  <Text>
                    {item.latitude}, {item.longitude}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.fullWidthButtonDelete}
                onPress={() =>
                  Alert.alert('Delete Data', 'Are you sure?', [
                    {text: 'No'},
                    {text: 'Yes', onPress: () => deleteData(item.id)},
                  ])
                }>
                <FontAwesomeIcon icon={faTrash} size={20} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.fullWidthButtonPin}
                onPress={() => {
                  onShowMarker(item); // Pass the selected marker
                  navigateToMap(); // Navigate to MapScreen
                }}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size={20}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Listdata;
