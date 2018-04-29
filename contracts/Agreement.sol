pragma solidity^0.4.19;

contract Agreement {

  string _hash;

  enum State {Created, Disabled}
  State state;

  modifier inState(State s) {require(s == state); _;}

  function Agreement (string hash) public 
    inState(State.Created)
  {
    _hash = hash;
    state = State.Disabled;
  }

  function getHash() view public 
  inState(State.Disabled) 
  returns(string)
  {
    return _hash;
  }
}