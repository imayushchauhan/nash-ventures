//require files
const Fs = require('fs');

module.exports = {
    getResponseObject: function (responseData, message, code) {
        return {
            responseData: responseData,
            message: message,
            code: code
        };
    },

    readFile: function (imagePath) {
        return new Promise((resolve, reject) => {
            Fs.readFile(imagePath, 'utf8', function (err, res) {
                if (err) return reject(err);

                return resolve("ayush");
            });
        });
    },

    async: function (gen) {

        let _this = this;
        return new Promise((resolve, reject) => {
            let generator = gen.apply(_this, arguments);

            function handle(result){
                if (result.done)
                    return Promise.resolve(result.value);

                return Promise.resolve(result.value).then(function (res){
                    return handle(generator.next(res));
                }, function (err){
                    return handle(generator.throw(err));
                });
            }

            try {
                return handle(generator.next());
            } catch (err) {
                return Promise.reject(err);
            }
        })
    }
};

