'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  PickerIOS,
  PickerItemIOS,
  TouchableHighlight
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
      this.setState({name: newProps.imageData.name,
                      type: newProps.imageData.type});
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
                  {this.renderMatchButton()}
              </View>
            </View>
        );
    },
    renderEditableName() {
      if (this.props.editable && this.state.name !== '') {
        return (<TextInput
                  style={styles.buttonText}
                  placeholder={this.state.name}
                  onSubmitEditing={(e) => this.handleNameChange(e)}
                  clearTextOnFocus={true}
                  />);
      }
    },
    handleNameChange(event) {
      var newText = event.nativeEvent.text;
      if (newText !== null) {
        this.setState({name: newText, type: this.state.type});
        this.props.nameChange(newText, this.props.imageData.pictureID);
      }
    },
    renderEditableType() {
      if (this.props.editable && this.state.name !== '') {
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
      this.props.typeChange(value, this.props.imageData.pictureID);
    },
    renderMatchButton() {
      if (this.props.editable && this.state.type !== Items.ANY) {
        return (
          <TouchableHighlight
            onPress={this.handleMatch}
            style={styles.match}
          >
            <Text style={styles.matchText}>Match!</Text>
          </TouchableHighlight>
        );
      }
    },
    handleMatch() {
      this.props.matchChange(this.state.type, this.props.imageData.pictureID);
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
    flex: 15
  },
  matchText: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
    borderColor: 'green',
    borderWidth: 5.0,
  },
  picker: {
    flex: 4,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 0,
    height: 350,
  }
});


module.exports = ClothesSelectedDisplay;
