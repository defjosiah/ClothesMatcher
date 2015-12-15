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
var Items = require('../../constants/ItemConstants');

var ClothesSelectedDisplay = React.createClass({
    getInitialState() {
      return {
        name: this.props.imageData.name,
        type: this.props.imageData.type
      };
    },
    componentWillReceiveProps(newProps) {
      this.setState({name: newProps.imageData.name, type: "ANY"});
    },
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
        console.log("this is happening");
        return (<TextInput
                  style={styles.buttonText}
                  placeholder={this.state.name}
                  onSubmitEditing={(e) => this.handleNameChange(e)}
                  clearTextOnFocus={true}
                  />);
      } else {
        return <Text style={styles.buttonText}>Not-Editable</Text>;
      }
    },
    handleNameChange(event) {
      var newText = event.nativeEvent.text;
      if (newText !== null) {
        this.setState({name: newText, type: this.state.type});
      }
    },
    renderEditableType() {
      if (this.props.editable) {
        return (
          <View>
            <PickerIOS
            selectedValue={this.state.type}
            onValueChange={(picked) => this.handleTypeChange(picked)}
            style={styles.picker}
            >
            <PickerItemIOS
              key={Items.ANY}
              value={Items.ANY}
              label="None"
            />
            <PickerItemIOS
              key={Items.TOPS}
              value={Items.TOPS}
              label="Tops"
            />
            <PickerItemIOS
              key={Items.BOTTOMS}
              value={Items.BOTTOMS}
              label="Bottoms"
            />
          </PickerIOS>
        </View>
        );
      }
    },
    handleTypeChange(value) {
      this.setState({name: this.state.name, type: value})
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
    flex: 8,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 0,
    height: 350,
  }
});


module.exports = ClothesSelectedDisplay;
