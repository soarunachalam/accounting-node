module.exports = function (orm, db) {
	var Customerinfo = db.define('customerinfo', {
	  id			: {type: 'serial', key: true}, // the auto-incrementing primary key
	  name			: {type: 'text'},
	  addr1			: {type: 'text'},
	  addr2			: {type: 'text'},
	  town			: {type: 'text'},
	  area			: {type: 'text'},
	  phone			: {type: 'text'},
	  prime_name	: {type: 'text'},
	  prime_phone	: {type: 'text'}
	}, {
	  validations: {
		  name			: orm.enforce.ranges.length(2, 128),
		  addr1			: orm.enforce.ranges.length(1, 256),
		  addr2			: orm.enforce.ranges.length(0, 256),
		  town			: orm.enforce.ranges.length(1, 256),
		  phone			: orm.enforce.ranges.length(5, 15),
		  prime_name	: orm.enforce.ranges.length(2, 128),
		  prime_phone	: orm.enforce.ranges.length(5, 15)
	  },	
	  methods : {
		fullAddress: function() {
		  return this.addr1 + ';' + this.addr2+ ';' + this.town+ ';' + this.area;
		}
	  }
	});
};