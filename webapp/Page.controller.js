sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel'],
	function(Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.m.sample.Tree.Page", {
		onInit : function (evt) {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/m/sample/Tree") + "/Tree.json");
			this.getView().setModel(oModel);
		},
		sSelectable: function (aNodes) {
			return String(Array.isArray(aNodes));
		},
		onTreeToggleOpenState: function (oEvent) {
			var nCurrentIndex = oEvent.getParameter("itemIndex");
			var oItemsBinding = oEvent.getSource().getBinding("items");
			var oCurrentNode = oItemsBinding.findNode(nCurrentIndex);
			var oExpandedStateObject = oItemsBinding._mTreeState.expanded;
			for (var sNodeId in oExpandedStateObject) {
                if (Object.hasOwnProperty.call(oExpandedStateObject, sNodeId)) {
                    var oNode = oExpandedStateObject[sNodeId];
                    if (oCurrentNode.groupID.indexOf(oNode.groupID) === -1) {
                        oNode.expanded = false;
                    }
                }
            }
			oItemsBinding._fireChange(); // ToDo: Is there a better way?
		},
	});

	return PageController;

});