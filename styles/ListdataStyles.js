import {StyleSheet} from 'react-native';

const ListdataStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    elevation: 2,
  },
  avatar: {
    marginRight: 15,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#E8E8E8',
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },  
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Buttons in a row
    justifyContent: 'space-between', // Space between buttons
    marginHorizontal: 6, // Align with card's horizontal margin
    marginVertical: 5, // Space above and below
    elevation: 1,
  },
  fullWidthButtonDelete: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff', // Specific background for delete
    borderRadius: 3,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
  },
  fullWidthButtonPin: {
    flex: 1,
    padding: 12,
    backgroundColor: '#dd3e3e', // Specific background for pin
    borderRadius: 3,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
  },
});

export default ListdataStyles;
