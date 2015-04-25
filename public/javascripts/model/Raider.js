/**
 * Created by mbrune on 2/10/15.
 */
module.exports = function (mongoose) {

    var RaiderSchema = new mongoose.Schema({
        charName: {type: String, unique: true, required: true},
        className: {type: String},
        specName: {type: String},
        level: {type: Number, min: 1, max: 100}
    });

    var Raider = mongoose.model('Raider', RaiderSchema);

    var registerCallback = function (err) {
        if (err) {
            return console.log(err);
        }

        return console.log('Raider was creaated');
    };

    var register = function (charName, className, spec, lvl) {
        console.log('Registering' + charName);
        var player = new Raider({
            charName: charName,
            className: className,
            classSpec: spec,
            level: lvl
        });
        player.save(registerCallback);
        console.log("Save command was sent");
    };

    return {
        register: register,
        Raider: Raider
    }
};