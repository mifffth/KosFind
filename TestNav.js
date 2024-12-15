import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Listdata from './Listdata';
import MapScreen from './MapScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleShowMarker = marker => {
    setSelectedMarker(marker);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="List">
          {props => (
            <Listdata
              {...props}
              onShowMarker={handleShowMarker}
              navigateToMap={() => props.navigation.navigate('Map')}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Map">
          {props => (
            <MapScreen
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
