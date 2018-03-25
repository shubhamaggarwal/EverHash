pragma solidity^0.4.19;

contract Agreement {

  string _hash;

  function Agreement (string hash) public {
    _hash = hash;
  }

  function getHash() view public returns(string) {
    return _hash;
  }
}