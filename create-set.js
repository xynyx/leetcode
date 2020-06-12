/** 
 * Design a data structure that supports all following operations in average O(1) time.
 */

 var RandomizedSet = function() {
  this.set = [];
  this.hash = {};
};

/**
* Inserts a value to the set. Returns true if the set did not already contain the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.insert = function(val) {
  // Return false/do not insert if value already exists
  if (Number.isInteger(this.hash[val])) return false;
  const index = this.set.length;
  this.set.push(val);
  // Add key/index to hash as well
  this.hash[val] = index;
  return true;
};

/**
* Removes a value from the set. Returns true if the set contained the specified element. 
* @param {number} val
* @return {boolean}
*/
RandomizedSet.prototype.remove = function(val) {
  const index = this.hash[val];
  // Check if index of value is present
  if (!Number.isInteger(index)) return false;
    
  const size = this.set.length;
  
  const lastValue = this.set[size - 1];
  const currentValue = this.set[index];
  
  // Swap val with last element in set
  this.set[index] = lastValue;
  this.set[size - 1] = currentValue;
  
  // To keep this fn O(1), pop() now that the current val is swapped to be the last element
  this.set.pop();

  // Have to update hash table for new index of last element
  this.hash[lastValue] = index;
  
  // Remove the hash for the deleted set value
  delete this.hash[val];

  return true;
};

/**
* Get a random element from the set.
* @return {number}
*/
RandomizedSet.prototype.getRandom = function() {
  return this.set[Math.floor(Math.random() * this.set.length)];
};

/** 
* Your RandomizedSet object will be instantiated and called as such:
* var obj = new RandomizedSet()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/