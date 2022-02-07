var contrat = artifacts.require("./contrat.sol");

module.exports = function(deployer) {
  deployer.deploy(contrat);
};