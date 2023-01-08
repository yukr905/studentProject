/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn("users","name","username")
};

exports.down = pgm => {
    pgm.alterColumn("users","username","name")
};
