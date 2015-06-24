$(function() {
	function test() {
		var key = bitcoin.ECKey.makeRandom();
		console.log("key.toWIF(): " + key.toWIF());
		console.log("key.pub.getAddress().toString(): " + key.pub.getAddress().toString());
	}

	function balance(address) {
		$.ajax({
			method: "GET",
			dataType: "json",
			url: "http://btc.blockr.io/api/v1/address/balance/" + address,
			data: {
				confirmations: 0
			}
		}).done(function(res) {
			console.log("balance done!");
			console.log("res:");
			console.log(res);
			return res;
		}).fail(function(jqXHR, textStatus) {
			console.log("balance fail!");
			console.log("jqXHR:");
			console.log(jqXHR);
			console.log("textStatus:");
			console.log(textStatus);
			return null;
		});
	}

	function unspent(address) {
		$.ajax({
			method: "GET",
			dataType: "json",
			url: "http://btc.blockr.io/api/v1/address/unspent/" + address,
			data: {
				unconfirmed: 1
			}
		}).done(function(res) {
			console.log("unspent done!");
			console.log("res:");
			console.log(res);
			return res;
		}).fail(function(jqXHR, textStatus) {
			console.log("unspent fail!");
			console.log("jqXHR:");
			console.log(jqXHR);
			console.log("textStatus:");
			console.log(textStatus);
			return null;
		});
	}

	function push(tx) {
		$.ajax({
			method: "POST",
			dataType: "json",
			url: "http://btc.blockr.io/api/v1/tx/push/",
			data: {
				hex: tx.build().toHex()
			}
		}).done(function(res) {
			console.log("push done!");
			console.log("res:");
			console.log(res);
		}).fail(function(jqXHR, textStatus) {
			console.log("push fail!");
			console.log("jqXHR:");
			console.log(jqXHR);
			console.log("textStatus:");
			console.log(textStatus);
		});
	}

	var wif = "KwiXoQ6qZESB2yCQrKTbfiCYYBQdGx7uSEaGn4LVbbptQbgm968t";
	var address = "1DpzoFwanW3cwdNdqgGa9KFp147vZPPMkf";

	$.ajax({
		method: "GET",
		dataType: "json",
		url: "http://btc.blockr.io/api/v1/address/balance/" + address,
		data: {
			confirmations: 0
		}
	}).done(function(res) {
		console.log("balance done!");
		var balance = res.data.balance;

		$.ajax({
			method: "GET",
			dataType: "json",
			url: "http://btc.blockr.io/api/v1/address/unspent/" + address,
			data: {
				unconfirmed: 1
			}
		}).done(function(res) {
			console.log("unspent done!");
			console.log(res);
			var tx = new bitcoin.TransactionBuilder();
			tx.addInput(res.data.unspent[0].tx, res.data.unspent[0].n);
			console.log(parseFloat(balance) * 1e8 - 1000);
			tx.addOutput("1MxdeSkYWicRuihjmd43JCi25LMVDDDzWh", parseFloat(balance) * 1e8 - 1000);
			var keyPair = bitcoin.ECKey.fromWIF(wif);
			tx.sign(0, keyPair);

			$.ajax({
				method: "POST",
				dataType: "json",
				url: "http://btc.blockr.io/api/v1/tx/push/",
				data: {
					hex: tx.build().toHex()
				}
			}).done(function(res) {
				console.log("push done!");
				balance(address);
			}).fail(function(jqXHR, textStatus) {
				console.log("push fail!");
			});
		}).fail(function(jqXHR, textStatus) {
			console.log("unspent fail!");
		});
	}).fail(function(jqXHR, textStatus) {
		console.log("balance fail!");
	});
});