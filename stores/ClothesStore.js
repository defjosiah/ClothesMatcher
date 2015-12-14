/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
  AsyncStorage
} = React;

var items = require('../constants/ItemConstants');
var KEY_ROOT = '@ITEM_STORE';
var defaultData = {name: '', type: '', matches:[]};
var Format = require('../utils/format.js');

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    init() {
        var fetchParams = {
          first: 26,
          groupTypes: 'Album',
          groupName: 'Clothes'
        }
        CameraRoll.getPhotos(fetchParams, (data) => this.processImages(data),
                             (data) => this.processImageError(data));
        return true;
    },
    processImages(data) {
        var assets = data.edges;
        var images = assets.map((asset) =>
                                    Format.getAssetId(asset.node.image.uri));
        console.log("Images are: " + images);
        var successFunc = (curr) => {
            var notIn = images.filter((i) => curr.indexOf(i) < 0);
            notIn.forEach((k) => {
                this.addItem(k, defaultData, () => console.log("trivial success"),
                          () => console.log("trivial failure"))
            });
        };
        var filterFunc = (x) => 1 == 1;
        this.getItemsWithFilter(filterFunc, successFunc,
                                   () => console.log('failed'));
    },
    processImageError() {
        console.log('I hate errors');
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
        var value = null;
        try {
            value = await dbFunc();
            console.log(typeof value);
            if (value == null) {
                failFunc();
            } else {
                if (Array.isArray(value)) {
                    successFunc(value);
                } else {
                    console.log("With await else");
                    successFunc(JSON.parse(value));
                }
            }
        } catch (error) {
            console.log('AsyncStorage error with await: ' + error);
        }
        return value;
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
    addToBase(pictureIDs) {
        console.log("In add to base with: " + pictureIDs);
        console.log(KEY_ROOT);
        var base = this.getItem(KEY_ROOT, () => console.log("This is dumb"),
                                () => console.log("This is dumber"));
        console.log(base);
        pictureIDs.forEach((k) => {
            if (base.indexOf(k) < 0) {
                base.push(k);
            }
        });
        this.withAwaitVoid(() => AsyncStorage.setItem(KEY_ROOT,
                                JSON.stringify(base)),
                        () => console.log("Successful"),
                        () => console.log("Unsuccessful"));
    }
};

module.exports = ClothesStore;
