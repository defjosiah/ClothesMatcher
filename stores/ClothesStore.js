/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
} = React;

var DB = require('react-native-store');

var items = require('../constants/ItemConstants');
var KEY_ROOT = '@ITEM_STORE';
var Format = require('../utils/format.js');

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    async init() {
        this.itemStore = await DB.model('ItemStore');
        var fetchParams = {
          first: 6,
          groupTypes: 'Album',
          groupName: 'Clothes',
          assetType: 'Photos'
        };
        CameraRoll.getPhotos(fetchParams, (data) => this.processImages(data),
                             () => this.processImageError(data));
    },
    async processImages(data) {
        var assets = data.edges;
        var images = assets.map((a) =>
                                    Format.getAssetId(a.node.image.uri));
        console.log(images);
        var currentIDs = await this.itemStore.find({fields: {pictureID: true}});
        if (currentIDs != null) {
            currentIDs = currentIDs.map((x) => x.pictureID);
        } else {
            currentIDs = [];
        }
        var newPictures = [];
        images.forEach((k) => {
            if (currentIDs.indexOf(k) < 0) {
                newPictures.push(k);
            }
        });
        for (var i = 0; i < newPictures.length; i++) {
            var newData = {
                pictureID: newPictures[i], 
                name: '',
                type: '',
                matches:[]
            };
            await this.itemStore.add(newData);
        };
    },
    processImageError() {
        console.log('I hate errors');
        console.log('Why isn\'t htis working?');
    },
    async getItem(pictureID, successFunc, failFunc) {
        return this.withAwait(() => AsyncStorage.getItem(pictureID),
                                successFunc, failFunc);
    },
    async getItemsWithFilter(filterFunc, successFunc, failFunc) {
        var allItemsSuccess = (f) => {
            this.withAwait(() => AsyncStorage.multiGet(f),
                                  successFunc, failFunc);
        };
        return this.withAwaitFilter(() => AsyncStorage.getItem(KEY_ROOT),
                                    filterFunc,
                                    allItemsSuccess,
                                    () => console.log("Failed filter items"));
    },
    /**
     * addItem will replace the current data with a new data function.
     */
    async addItem(pictureID, data, successFunc, failFunc) {
        var updateBaseSuccess = (value) => {
            this.addToBase([pictureID]);
            successFunc(value);
        };
        return this.withAwaitVoid(() => AsyncStorage.setItem(pictureID,
                                    JSON.stringify(data)),
                              updateBaseSuccess, failFunc);
    },
    /**
     * Set a range of pictureIDs with either empty data or the 
     * supplied data pair.
     */
    async addItems(pictureDataPairs, successFunc, failFunc) {
        var updateBaseSuccess = () => {
            this.addToBase(pictureDataPairs.map((x) => x[0]));
            successFunc();
        };
        pairsJSON = pictureDataPairs.map((x) => {
                return ([x[0], JSON.stringify(x[1])])
            });
        return this.withAwaitVoid(() => AsyncStorage.multiSet(pictureDataPairs),
                              updateBaseSuccess, failFunc);
    },
    async withAwait(dbFunc, successFunc, failFunc) {
        try {
            let value = await dbFunc();
            if (value == null) {
                failFunc();
            } else {
                successFunc(JSON.parse(value));
            }
        } catch (error) {
            console.log('AsyncStorage error with await: ' + error);
        }
    },
    async withAwaitFilter(dbFunc, filterFunc, successFunc, failFunc) {
        var value = null;
        try {
            value = await dbFunc();
            console.log(value);
            if (value == null) {
                value = [];
            } else {
                value = JSON.parse(value).filter(filterFunc);
            }
            successFunc(value);
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
        return value;
    },
    async withAwaitVoid(dbFunc, successFunc, failFunc) {
        try {
           await dbFunc();
           console.log("await void?");
           successFunc();
        } catch (error) {
            failFunc()
        }
    },
    async addToBase(pictureIDs) {
        console.log("In add to base with: " + pictureIDs);
        var oldRoot = this.root;
        successFunc = (value) => {
            this.root = value;
        };
        console.log("is this even being called");
        await this.getItem(KEY_ROOT, successFunc, () => this.root = oldRoot);
        //TODO: might be an issue here with saving the old root on failure.
        console.log("past KEY_ROOT fetch?");
        console.log(this.root);
        pictureIDs.forEach((k) => {
            if (this.root.indexOf(k) < 0) {
                this.root.push(k);
            }
        });
        console.log(this.root);
        await this.withAwaitVoid(() => AsyncStorage.setItem(KEY_ROOT,
                                JSON.stringify(this.root)),
                        () => console.log("Successful"),
                        () => console.log("Unsuccessful"));
    }
};

module.exports = ClothesStore;
