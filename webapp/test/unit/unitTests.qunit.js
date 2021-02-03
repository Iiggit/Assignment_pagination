/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/Pagination/Assignment_Pagination/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});