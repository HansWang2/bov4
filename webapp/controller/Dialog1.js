sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function (ManagedObject, MessageBox, Utilities, History) {

	return ManagedObject.extend("com.sap.build.standard.leaveRequestAcceptDecline.controller.Dialog1", {
		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.standard.leaveRequestAcceptDecline.view.Dialog1", this);
			this._bInit = false;
		},

		exit: function () {
			delete this._oView;
		},

		getView: function () {
			return this._oView;
		},

		getControl: function () {
			return this._oControl;
		},

		getOwnerComponent: function () {
			return this._oView.getController().getOwnerComponent();
		},

		open: function () {
			var oView = this._oView;
			var oControl = this._oControl;

			if (!this._bInit) {

				// Initialize our fragment
				this.onInit();

				this._bInit = true;

				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}

			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
		},

		close: function () {
			this._oControl.close();
		},

		setRouter: function (oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function () {
			return {};

		},
		_onButtonPress: function (oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function (fnResolve) {
					fnResolve(true);
				})
				.then(function (result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function (fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function (oData) {
										var sKey = oModel.getKey(oData);
										oData["Status"] = "Rejected";
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["Status"] = "Rejected";
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function (result) {
					if (result === false) {
						return false;
					} else {

						this.close();

					}
				}.bind(this)).catch(function (err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress1: function (oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function (fnResolve) {
					fnResolve(true);
				})
				.then(function (result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function (fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function (oData) {
										var sKey = oModel.getKey(oData);
										oData["Status"] = "Approved";
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["Status"] = "Approved";
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function (result) {
					if (result === false) {
						return false;
					} else {

						this.close();

					}
				}.bind(this)).catch(function (err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress2: function () {

			this.close();

		},
		onInit: function () {

			this._oDialog = this.getControl();

		},
		onExit: function () {
			this._oDialog.destroy();

		}

	});
}, /* bExport= */ true);