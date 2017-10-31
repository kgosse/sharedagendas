import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { Button as ADButton } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import { SERVICE_STATES } from "../../../../utils/consts";
import {SCREENS, TITLES} from "../../../../utils/consts";

var {height, width} = Dimensions.get('window');

@inject('Weather') @observer
export default class MeteoSearchScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  static propTypes = {
    navigator: PropTypes.object,
    Weather: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchString: '',
      message: ''
    };

  }

  handleTextInputChange = (event) => {
    this.setState({searchString: event.nativeEvent.text});
  };

  handleSearchButtonPressed = () => {
    const {Weather, navigator} = this.props;
    const place = this.state.searchString;
    Weather.fetchApiDataForCurrentWeather(place, () => {
      navigator.push({
        screen: SCREENS.today,
        title: TITLES.today + ` (${place})`,
      });
    });
  };

  render() {
    const {Weather} = this.props;
    return (
      <View style={styles.searchContainer}>
        <Image
          style={styles.image}
          source={require('../../../../assets/background.png')}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>Get your Weather dose!</Text>

            <TextInput
              placeholder='Enter your city name'
              style={styles.textInput}
              value={this.state.searchString}
              onChange={this.handleTextInputChange} />

            <ADButton type="primary" onClick={this.handleSearchButtonPressed}
                      disabled={Weather.fetchApiDataForCurrentWeatherRequest.state === SERVICE_STATES.pending}
                      loading={Weather.fetchApiDataForCurrentWeatherRequest.state === SERVICE_STATES.pending}>
              Get Weather
            </ADButton>
            {/*<Text>{this.state.message}</Text>*/}
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    // padding: 65,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex:1,
    // resizeMode: 'cover',
    width: width,
    height: height
  },
  innerContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // padding: 80
  },
  text: {
    marginTop: 40,
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  textInput: {
    height: 36,
    alignSelf: 'stretch',
    // marginTop: 20,
    // marginBottom: 10,
    padding: 4,
    margin: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#0ea378',
    backgroundColor: 'white',
    borderRadius: 3,
    color: '#48BBEC'
  },
  button: {
    height: 36,
    alignSelf: 'stretch',
    backgroundColor: '#6BBD6D',
    //borderColor: '#0ea378',
    //borderWidth: 1,
    borderRadius: 3,
    // flex: 1,
    justifyContent: 'center',
    margin: 20
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  }
});
