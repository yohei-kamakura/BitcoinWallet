$(function() {
	var key = bitcoin.ECKey.makeRandom();
	console.log("key.toWIF(): " + key.toWIF());
	console.log("key.pub.getAddress().toString(): " + key.pub.getAddress().toString());

	$.ajax({
		method: "GET",
		dataType: "json",
		url: "http://btc.blockr.io/api/v1/address/unspent/" + key.pub.getAddress().toString(),
		data: {
			unconfirmed: 1
		}
	}).done(function(data) {
		console.log("unspent done!");
		console.log("data:");
		console.log(data);
	}).fail(function(jqXHR, textStatus) {
		console.log("unspent fail!");
		console.log("jqXHR:");
		console.log(jqXHR);
		console.log("textStatus:");
		console.log(textStatus);
	});

	$.ajax({
		method: "GET",
		dataType: "json",
		url: "http://btc.blockr.io/api/v1/address/balance/" + key.pub.getAddress().toString(),
		data: {
			unconfirmed: 1
		}
	}).done(function(data) {
		console.log("balance done!");
		console.log("data:");
		console.log(data);
	}).fail(function(jqXHR, textStatus) {
		console.log("balance fail!");
		console.log("jqXHR:");
		console.log(jqXHR);
		console.log("textStatus:");
		console.log(textStatus);
	});
});