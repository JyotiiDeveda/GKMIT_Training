function a() {
	var x = 10;
	function b() {
		console.log(y);
		function c() {
			console.log(x);
		}
	}
}

var y = 20;
a();
