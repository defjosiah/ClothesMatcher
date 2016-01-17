/**
 * @flow
 */
 var React = require('react-native');
 var ClothesListSwitcher = require('../shared/ClothesListSwitcher');
 var Items = require('../../constants/ItemConstants');
 var AdminClothesDisplay = React.createClass({
   render: function() {
     return (<ClothesListSwitcher
                initialRoute={Items.ANY}
                editable={true}
             />);
   }
 });

 module.exports = AdminClothesDisplay;
