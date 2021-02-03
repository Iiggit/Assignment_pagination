sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var clicks = 0;
	var num;


	return Controller.extend("com.Pagination.Assignment_Pagination.controller.View1", {
		onInit: function () {
			var Btn = this.getView().byId("previous");
			Btn.setEnabled(false);
			var URL = this.getOwnerComponent().getModel("Data").sServiceUrl;
			var oModel1 = new sap.ui.model.odata.ODataModel(URL);
			oModel1.read("/Products", null, null, true, function (oData) {
				var count = oData.results.lenght;
				this.count1 = count - 10;
			});
			this.onInitialize();
		},
		onInitialize: function () {
			var that = this;
			var Btn = this.getView().byId("previous");
			Btn.setEnabled(false);
			var URL = this.getOwnerComponent().getModel("Data").sServiceUrl;
			var oModel1 = new sap.ui.model.odata.ODataModel(URL);
			oModel1.read("/Products?$top=10", null, null, true, function (oData) {
				var oODataJSONModel1 = new sap.ui.model.json.JSONModel(oData);
				//oODataJSONModel1.setData(oData);
				that.getView().setModel(oODataJSONModel1).byId("idtable");
			});
		},

		onNext: function () {

			if (clicks < 0) {
				clicks = 0;
				clicks += 1;
			} else {
				clicks += 1;
			}
			num = clicks * 10;
			//	this.count1;
			if (num === this.count1) {
				var Btn = this.getView().byId("next");
				Btn.setEnabled(false);
			}
			if (num >= 10) {
				 Btn = this.getView().byId("previous");
				Btn.setEnabled(true);
			}
			this.data();
		},

		onPrevious: function () {
			clicks -= 1;
			if (clicks <= 0) {
				num = 0;
			} else {
				num = clicks * 10;
			}
			if (num < this.count1) {
				var Btn = this.getView().byId("next");
				Btn.setEnabled(true);
			}
			if (num === 0) {
				 Btn = this.getView().byId("previous");
				Btn.setEnabled(false);
			}
			this.data();
		},

		data: function () {
			var that = this;
			var url = this.getOwnerComponent().getModel("Data").sServiceUrl;
			var oModel3 = new sap.ui.model.odata.ODataModel(url);
			oModel3.read("/Products?$top=10&$skip=" + num + "", null, null, true, function (oData) {
				var oODataJSONModel3 = new sap.ui.model.json.JSONModel(oData);
				//oODataJSONModel3.setData(oData);
				that.getView().setModel(oODataJSONModel3).byId("idtable");
			});
		}
	});
});