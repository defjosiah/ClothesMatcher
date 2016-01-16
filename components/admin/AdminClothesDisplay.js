/**
 * @flow
 */
 var React = require('react-native');
 var ClothesListSwitcher = require('../shared/ClothesListSwitcher');
 var AdminClothesDisplay = React.createClass({
   render: function() {
     return (<ClothesListSwitcher
             initialRoute={this.props.initialRoute}
             editable={this.props.editable}
             />);
   }
 });

 module.exports = AdminClothesDisplay;
 