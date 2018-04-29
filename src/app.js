var web3Provider = null;
var AgreementContract;
var bytecode;
const nullAddress = "0x0000000000000000000000000000000000000000";
var contractAdress;
var contractABI;

$(function() {
  $(window).load(function() {
    init();
  });
});

function init() {
  // We init web3 so we have access to the blockchain
  initWeb3();
}

function initWeb3() {
  if (typeof web3 !== 'undefined' && typeof web3.currentProvider !== 'undefined') {
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3Provider);
  } else {    
    console.error('No web3 provider found. Please install Metamask on your browser.');
    alert('No web3 provider found. Please install Metamask on your browser.');
  }
  
  // we init the Agreement contract infos so we can interact with it
  initAgreementContract();
}

function initAgreementContract () {
  $.getJSON('Agreement.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    AgreementContract = TruffleContract(data);
    // Set the provider for our contract
    AgreementContract.setProvider(web3Provider);

    // listen to the events emitted by our smart contract
    //getEvents ();
  });
}


function deployAgreement(userHash) {
  var deployAddress = web3.eth.accounts[0];
  AgreementContract.new(userHash, {from: deployAddress}).then(function(result){
    contractAdress = result.address;
    console.log(result);
  }).catch(function(err){
    console.log(err);
  });
}

function getHash() {
  AgreementContract.at(contractAdress).then(function(instance){
    console.log(instance);
    return instance.getHash();
  }).then(function(result){
    $("#response").text(result);
  }).catch( function(err){
    console.log(err.message);
  });
}