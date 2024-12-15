import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faLocationDot,
  faCheck,
  faTimes,
  faTrash,
  faPenToSquare,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import CreateData from './Createdata';
import EditData from './Editdata';
import styles from './styles/MapScreenStyles';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MAPTILER_API_KEY from './config/MapTilerAPI';
import {database} from './config/FirebaseAPI';
import {get, update, remove, set} from 'firebase/database'; // Added set method
import {ref as sRef} from 'firebase/database';

MapLibreGL.setAccessToken(null);

const MapScreen = ({markers: initialMarkers, selectedMarker}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddMode, setAddMode] = useState(false);
  const [tempCoordinate, setTempCoordinate] = useState(null);
  const [selectedPopupMarker, setSelectedPopupMarker] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [markerToEdit, setMarkerToEdit] = useState(null);
  const [isEditDataModalVisible, setEditDataModalVisible] = useState(false);
  const [markers, setMarkers] = useState(initialMarkers);

  useEffect(() => {
    fetchMarkers();

    const interval = setInterval(fetchMarkers, 500); // Poll every 0.5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const fetchMarkers = () => {
    const markersRef = sRef(database, '/mahasiswa');
    get(markersRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const markersArray = Object.keys(data).map(key => {
            return {id: key, ...data[key]}; // Use Firebase key as ID
          });

          setMarkers(markersArray); // Set markers state
        } else {
          console.log('No data available.');
          setMarkers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching markers from Firebase:', error);
      });
  };

  const handleMapPress = e => {
    if (isAddMode) {
      const {geometry} = e;
      setTempCoordinate(geometry.coordinates);
      setModalVisible(true);
      setAddMode(false);
    } else {
      setSelectedPopupMarker(null); // Close popup when map is clicked
    }
  };

  useEffect(() => {
    if (isAddMode || isEditMode) {
      setSelectedPopupMarker(null); // Close the popup when entering Add or Edit mode
    }
  }, [isAddMode, isEditMode]);

  const handleMarkerPress = marker => {
    setSelectedPopupMarker(marker); // Open popup for the selected marker
  };

  const handleEditClick = marker => {
    setEditMode(true);
    setMarkerToEdit({...marker});
    setSelectedPopupMarker(null); // Close popup
  };

  const handleDragEnd = e => {
    const {geometry} = e;
    setMarkerToEdit({
      ...markerToEdit,
      longitude: geometry.coordinates[0],
      latitude: geometry.coordinates[1],
    });
  };

  const handleEditDone = () => {
    setEditDataModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setMarkerToEdit(null);
  };

  const saveDraggedMarker = newCoordinates => {
    handleSaveEditData(newCoordinates); // Save the new coordinates to Firebase
  };

  const handleSaveEditData = updatedData => {
    try {
      const markerRef = sRef(database, `mahasiswa/${markerToEdit.id}`); // Reference to the marker data in Firebase
      update(markerRef, updatedData)
        .then(() => {
          const updatedMarkers = markers.map(marker =>
            marker.id === markerToEdit.id
              ? {...marker, ...updatedData}
              : marker,
          );
          setMarkers(updatedMarkers); // Update the markers state

          Alert.alert('Sukses', 'Data telah diperbarui.');

          // Close modal and reset states
          setEditDataModalVisible(false);
          setEditMode(false);
          setMarkerToEdit(null);
        })
        .catch(err => {
          console.error('Gagal memperbarui data:', err);
          Alert.alert('Error', 'Gagal memperbarui data.');
        });
    } catch (err) {
      console.error('Error in handleSaveEditData:', err);
    }
  };

  const handleAddMarkerFromLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ijin lokasi',
          message: 'Akses lokasi diperlukan untuk menambahkan marker.',
          buttonNeutral: 'Nanti saja',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setTempCoordinate([longitude, latitude]);
            setModalVisible(true);
            setAddMode(false);
          },
          error => {
            console.error('Error fetching location:', error);
            Alert.alert('Error', 'Failed to fetch location.');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
        Alert.alert(
          'Permission Denied',
          'You need to grant location permission to use this feature.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteData = id => {
    try {
      const itemRef = sRef(database, `mahasiswa/${id}`);
      remove(itemRef)
        .then(() => {
          // Update local markers state to remove the deleted marker
          setMarkers(prevMarkers =>
            prevMarkers.filter(marker => marker.id !== id),
          );
          Alert.alert('Sukses', 'Data terhapus.');
        })
        .catch(err => {
          console.error('Gagal menghapus data:', err);
          Alert.alert('Error', 'Gagal menghapus data.');
        });
    } catch (err) {
      console.error('Error in deleteData:', err);
    }
  };

  return (
       <View style={styles.container}>
      {/* Add Header Text for Add Mode */}
      {isAddMode && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Ketuk layar/ambil dari lokasi di pojok kanan atas untuk menambah marker
          </Text>
        </View>
      )}

      {/* Add Header Text for Edit Mode */}
      {isEditMode && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Geret/tekan ok untuk memperbarui data
          </Text>
        </View>
      )}
      <MapLibreGL.MapView
        style={styles.map}
        styleURL={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`}
        logoEnabled={true}
        onPress={handleMapPress}>
        <MapLibreGL.Camera
          centerCoordinate={
            selectedMarker
              ? [selectedMarker.longitude, selectedMarker.latitude]
              : [106.827153, -6.17511]
          }
          zoomLevel={selectedMarker ? 12 : 8}
        />
        {markers.map(marker => (
          <MapLibreGL.PointAnnotation
            key={marker.id}
            id={marker.id}
            coordinate={[
              isEditMode && markerToEdit?.id === marker.id
                ? markerToEdit.longitude
                : marker.longitude,
              isEditMode && markerToEdit?.id === marker.id
                ? markerToEdit.latitude
                : marker.latitude,
            ]}
            onSelected={() => handleMarkerPress(marker)}
            draggable={isEditMode && markerToEdit?.id === marker.id}
            onDragEnd={
              isEditMode && markerToEdit?.id === marker.id
                ? handleDragEnd
                : undefined
            }
            iconSize={2.5}
            >   
            <FontAwesomeIcon icon={faLocationDot} size={50} color='#dd3e3e' />
          </MapLibreGL.PointAnnotation>
        ))}

        {selectedPopupMarker && (
          <MapLibreGL.MarkerView
            coordinate={[
              selectedPopupMarker.longitude,
              selectedPopupMarker.latitude,
            ]}
            anchor={{x: 0.5, y: 1.2}}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <View style={[styles.popup, styles.popupContainer]}>
                <Text style={styles.title}>
                  {selectedPopupMarker.first_name}{' '}
                  {selectedPopupMarker.last_name}
                </Text>
                <Text style={styles.popupText}>
                  {selectedPopupMarker.address}
                </Text>
                <Text style={styles.popupText}>
                  {selectedPopupMarker.gender}
                </Text>
                <View style={styles.buttonContainerIcon}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      Alert.alert(
                        'Hapus Data',
                        'Hapus data ini?',
                        [
                          {
                            text: 'Batal',
                            onPress: () => console.log('Batal'),
                          },
                          {
                            text: 'Ya',
                            onPress: () => {
                              deleteData(selectedPopupMarker.id);
                              setSelectedPopupMarker(null);
                            },
                          },
                        ],
                        {cancelable: true},
                      )
                    }>
                    <FontAwesomeIcon icon={faTrash} size={20} color="#000000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditClick(selectedPopupMarker)}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </MapLibreGL.MarkerView>
        )}
      </MapLibreGL.MapView>

      {isEditMode && (
        <>
          <View style={styles.editModeFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleEditCancel}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#000000" />
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleEditDone}>
              <FontAwesomeIcon icon={faCheck} size={20} color="#ffffff" />
              <Text style={styles.doneButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isAddMode && (
        <>
          <View style={styles.addModeHeader}>
            <TouchableOpacity
              style={styles.cancelAddButton}
              onPress={() => {
                setAddMode(false);
                setTempCoordinate(null);
              }}>
              <FontAwesomeIcon icon={faTimes} size={20} color="#000000" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addMarkerButton}
            onPress={handleAddMarkerFromLocation}>
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              size={50}
              color="#58c7ff"
            />
          </TouchableOpacity>
        </>
      )}

      {isEditDataModalVisible && (
        <EditData
          isModalVisible={isEditDataModalVisible}
          setModalVisible={setEditDataModalVisible}
          coordinates={[markerToEdit.longitude, markerToEdit.latitude]}
          selectedUser={markerToEdit}
          setSelectedUser={setMarkerToEdit}
          onSave={handleSaveEditData}
        />
      )}

      {!isAddMode && !isEditMode && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setAddMode(true)}>
          <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <CreateData
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        coordinates={tempCoordinate}
      />
    </View>
  );
};

export default MapScreen;
