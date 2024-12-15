import {StyleSheet} from 'react-native';

const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  map: {flex: 1},
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#dd3e3e',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#58c7ff', // Adjust background color if needed
    textAlign: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addModeHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  popup: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly more opaque
    borderRadius: 12,
    maxWidth: 250, // Increase width for more content
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Modern box-shadow for better depth
  },
  popupContainer: {
    position: 'absolute',
    top: -60, // Adjust this based on the marker size and preferred offset
  },
  popupIcon: {
    marginBottom: 8,
  },
  popupText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    style: 'bold',
  },
  editModeFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#000',
    padding: 10,
    zIndex: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#000000',
    marginLeft: 5,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#dd3e3e',
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  popupButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  buttonContainerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#dd3e3e',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Red color for cancel
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#000000',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addMarkerButton: {
    position: 'absolute',
    top: 75, // Adjust to be at the top
    right: 10, // Right side of the screen
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  basemapSelector: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 5,
  },
  basemapButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#58c7ff',
    borderRadius: 5,
  },
  basemapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MapScreenStyles;
