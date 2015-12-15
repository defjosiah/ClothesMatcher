'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  PickerIOS,
  PickerItemIOS
} = React;

var ClothesItem = require('./ClothesItem');

var ClothesSelectedDisplay = React.createClass({
    render() {
        return (
            <View style={styles.wrapper}>
              <View style={styles.display}>
                  <ClothesItem rowData={this.props.imageData}
                    onPress={() => console.log("pressed")}
                  />
                  {this.renderEditableName()}
                  {this.renderEditableType()}
              </View>
            </View>
        );
    },
    renderEditableName() {
      if (this.props.editable) {
        return (<TextInput
                  style={styles.buttonText}
                  placeholder={this.props.imageData.name}
                  />);
      } else {
        return <Text style={styles.buttonText}>Not-Editable</Text>;
      }
    },
    renderEditableType() {
      if (this.props.editable) {
        return (
          <View>
            <PickerIOS
            selectedValue="AnyValue"
            onValueChange={() => console.log("Lol")}
            style={styles.picker}
            >
            <PickerItemIOS
              key="AnyKey"
              value="AnyValue"
              label="AnyLabel"
            />
            <PickerItemIOS
              key="TopKey"
              value="TopValue"
              label="TopLabel"
            />
            <PickerItemIOS
              key="BottomKey"
              value="BottomValue"
              label="BottomLabel"
            />
          </PickerIOS>
        </View>
        );
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
  picker: {
    flex: 2,
    paddingLeft: 140,
    marginLeft: 0,
    padding: 0,
    height: 300,
  }
});


module.exports = ClothesSelectedDisplay;
