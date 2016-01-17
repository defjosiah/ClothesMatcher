/**
 * @flow
 */
var React = require('react-native');
var ClothesListSwitcher = require('../shared/ClothesListSwitcher');
var Items = require('../../constants/ItemConstants');
var UserClothesDisplay = React.createClass({
  render: function() {
    return (<ClothesListSwitcher
                initialRoute={Items.TOPS}
                editable={false} 
            />);
  }
});

module.exports = UserClothesDisplay;
