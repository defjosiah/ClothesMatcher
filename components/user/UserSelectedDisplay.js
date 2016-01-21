/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} = React;

var ClothesItem = require('../shared/ClothesItem');
var Items = require('../../constants/ItemConstants');

var UserSelectedDisplay = React.createClass({
    getInitialState() {
      return {
        topData: this.props.topData,
        bottomData: this.props.bottomData
      };
    },
    componentWillReceiveProps(newProps) {
      this.setState({topData: newProps.topData,
                      bottomData: newProps.bottomData});
    },
    render() {
        return (
            <View style={styles.wrapper}>
              <View style={styles.display}>
                  <ClothesItem rowData={this.props.topData}
                    onPress={() => console.log("pressed")}
                  />
                  {this.renderMatchButton()}
                  <ClothesItem rowData={this.props.bottomData}
                    onPress={() => console.log("pressed")}
                  />
              </View>
            </View>
        );
    },
    renderMatchButton() {
      if (this.state.topData.type !== Items.ANY || 
          this.state.bottomData.type !== Items.ANY) {
        return (
          <TouchableHighlight
            onPress={this.handleMatch}
            style={styles.match}
          >
            <Text style={styles.matchText}>Match!</Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <View style={[styles.match, {borderColor: 'grey'}]}>
            <Text style={styles.matchText}>Match!</Text>
          </View>
        );
      }
    },
    handleMatch() {
      if (this.state.topData.type !== '') {
        this.props.matchChange(this.state.topData)
      } else {
        this.props.matchChange(this.state.bottomData)
      } 
    }
});

var styles = StyleSheet.create({
  display: {
    flex: 16
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'left',
      flex: 9,
      padding: 0
  },
  match: {
    borderColor: 'green',
    borderWidth: 5.0
  },
  matchText: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center'
  },
  picker: {
    flex: 4,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 0,
    height: 350,
  }
});


module.exports = UserSelectedDisplay;
