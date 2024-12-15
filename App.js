import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faMap} from '@fortawesome/free-solid-svg-icons';
import {Text} from 'react-native';
import Listdata from './Listdata';
import Peta from './MapScreen';

function App() {
  const Tab = createBottomTabNavigator();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleShowMarker = marker => {
    setSelectedMarker(marker);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000000', // Active tab icon color (black)
          tabBarInactiveTintColor: '#B0B0B0', // Inactive tab icon color (gray)
          tabBarStyle: {
            backgroundColor: '#ffffff', // Navigation bar background color
            borderTopWidth: 0.5,
            borderTopColor: '#000', // Border color
          },
          tabBarShowLabel: false, // Hide tab labels
        }}>
        <Tab.Screen
          name="List Data"
          options={{
            headerTitle: () => (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000',
                  letterSpacing: 1,
                }}>
                Kos<Text style={{color: '#dd3e3e'}}>Find</Text>
              </Text>
            ),
            headerStyle: {
              backgroundColor: '#FFFFFF', // Header background color
            },
            headerTintColor: '#000000', // Header text color
            headerShown: true, // Show header
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}>
          {props => (
            <Listdata
              {...props}
              markers={markers}
              setMarkers={setMarkers}
              onShowMarker={handleShowMarker}
              navigateToMap={() => props.navigation.navigate('Peta')}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Peta"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faMap} color={color} size={20} />
            ),
            headerShown: false, // Hide header for this screen
          }}>
          {props => (
            <Peta
              {...props}
              markers={markers}
              selectedMarker={selectedMarker}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
