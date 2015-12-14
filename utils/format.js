//assets-library://asset/asset.PNG?id=C0A2E64E-1D39-4AFA-80D6-07163A5A646A&ext=PNG
//
var format = {
    buildAsset(id) {
        return 'assets-library://asset/asset.PNG?id=' + id + '&ext=PNG';
    }
}

module.exports = format;
